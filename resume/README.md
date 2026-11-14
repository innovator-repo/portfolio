# Résumé source

`resume.html` is the source of `public/Resume.pdf`. To regenerate after editing:

```sh
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/resume/resume.html',{waitUntil:'networkidle'});await p.pdf({path:'public/Resume.pdf',format:'A4',printBackground:true,preferCSSPageSize:true});await b.close()})()"
```
