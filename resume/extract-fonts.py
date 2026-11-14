"""Pull the résumé fonts out of public/Resume.pdf into resume/fonts/ (not committed)."""
import os, pypdf
here = os.path.dirname(os.path.abspath(__file__))
os.makedirs(os.path.join(here, 'fonts'), exist_ok=True)
for page in pypdf.PdfReader(os.path.join(here, '..', 'public', 'Resume.pdf')).pages:
    for font in page['/Resources'].get('/Font', {}).values():
        f = font.get_object(); name = f['/BaseFont'].split('+')[-1]
        d = f['/DescendantFonts'][0].get_object()['/FontDescriptor'].get_object()
        if '/FontFile2' in d:
            open(os.path.join(here, 'fonts', name + '.ttf'), 'wb').write(d['/FontFile2'].get_object().get_data())
