"""Turn promo/hijjeh-promotion-copy.md into a Word document (promo/Hijjeh-promotion-copy.docx).

Handles the small Markdown subset used in that file: #/## headings, --- rules, - bullets, 1. lists,
**bold**, *italic*, and bare URLs (made into links). Each "## N ·" channel starts on a new page.
"""
import re
from pathlib import Path

from docx import Document
from docx.enum.text import WD_BREAK
from docx.opc.constants import RELATIONSHIP_TYPE as RT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

HERE = Path(__file__).parent
SRC = HERE / "hijjeh-promotion-copy.md"
OUT = HERE / "Hijjeh-promotion-copy.docx"

INK = RGBColor(0x28, 0x02, 0x09)
RED = RGBColor(0xA0, 0x11, 0x02)
LINK = RGBColor(0x1F, 0x4E, 0xB4)

doc = Document()
sec = doc.sections[0]
sec.left_margin = sec.right_margin = Cm(2.2)
sec.top_margin = sec.bottom_margin = Cm(2.0)

normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)
normal.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
normal.paragraph_format.space_after = Pt(6)
normal.paragraph_format.line_spacing = 1.15

for name, size, color in (("Heading 1", 22, INK), ("Heading 2", 15, RED), ("Heading 3", 12, INK)):
    st = doc.styles[name]
    st.font.name = "Calibri"
    st.font.size = Pt(size)
    st.font.bold = True
    st.font.color.rgb = color
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    st.paragraph_format.space_before = Pt(14 if name != "Heading 1" else 0)
    st.paragraph_format.space_after = Pt(6)
    st.paragraph_format.keep_with_next = True

URL = re.compile(r"(https?://[^\s)\]]+)")
TOKEN = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*|https?://[^\s)\]]+)")


def add_link(par, url, bold=False, italic=False):
    rid = par.part.relate_to(url, RT.HYPERLINK, is_external=True)
    link = OxmlElement("w:hyperlink")
    link.set(qn("r:id"), rid)
    run = OxmlElement("w:r")
    rpr = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "1F4EB4")
    under = OxmlElement("w:u")
    under.set(qn("w:val"), "single")
    rpr.append(color)
    rpr.append(under)
    if bold:
        rpr.append(OxmlElement("w:b"))
    if italic:
        rpr.append(OxmlElement("w:i"))
    run.append(rpr)
    t = OxmlElement("w:t")
    t.text = url
    t.set(qn("xml:space"), "preserve")
    run.append(t)
    link.append(run)
    par._p.append(link)


def add_inline(par, text, bold=False, italic=False):
    for part in TOKEN.split(text):
        if not part:
            continue
        if part.startswith("**") and part.endswith("**"):
            add_inline(par, part[2:-2], bold=True, italic=italic)
        elif part.startswith("*") and part.endswith("*") and len(part) > 2:
            add_inline(par, part[1:-1], bold=bold, italic=True)
        elif URL.fullmatch(part):
            add_link(par, part, bold, italic)
        else:
            run = par.add_run(part)
            run.bold = bold
            run.italic = italic


def rule(par):
    ppr = par._p.get_or_add_pPr()
    bdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    for k, v in (("val", "single"), ("sz", "6"), ("space", "1"), ("color", "A6A19A")):
        bottom.set(qn("w:" + k), v)
    bdr.append(bottom)
    ppr.append(bdr)


lines = SRC.read_text(encoding="utf8").splitlines()
first_section = True
for raw in lines:
    line = raw.rstrip()
    if not line.strip():
        continue
    if line.startswith("# "):
        doc.add_heading(line[2:], level=1)
    elif line.startswith("## "):
        # each numbered channel gets its own page; the intro sections do not
        if re.match(r"## \d ·", line):
            if not first_section:
                doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
            first_section = False
        doc.add_heading(line[3:], level=2)
    elif line.strip() == "---":
        rule(doc.add_paragraph())
    elif re.match(r"^\d+\. ", line):
        # typed numbers with a hanging indent, so every list restarts at 1 (Word's auto-numbering would continue)
        num, rest = re.match(r"^(\d+)\. (.*)$", line).groups()
        p = doc.add_paragraph()
        p.paragraph_format.left_indent = Cm(0.9)
        p.paragraph_format.first_line_indent = Cm(-0.6)
        p.paragraph_format.space_after = Pt(3)
        p.add_run(num + ".  ")
        add_inline(p, rest)
    elif line.startswith("- "):
        p = doc.add_paragraph(style="List Bullet")
        add_inline(p, line[2:])
    else:
        p = doc.add_paragraph()
        add_inline(p, line)

doc.save(OUT)
print("wrote", OUT, OUT.stat().st_size, "bytes")
