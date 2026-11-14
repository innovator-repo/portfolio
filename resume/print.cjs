const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('file://'+__dirname+'/resume.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const hf='font-family:"DejaVu Sans";font-size:6pt;color:#555;width:100%;padding:0 45.7pt;';
await p.pdf({path:__dirname+'/../public/Resume.pdf',format:'A4',printBackground:true,displayHeaderFooter:true,
 headerTemplate:`<div style='${hf}margin-top:0'><span class=title></span></div>`,
 footerTemplate:`<div style='${hf}text-align:right;margin-bottom:14pt'>Page <span class=pageNumber></span> of <span class=totalPages></span></div>`,
 margin:{top:'48px',bottom:'48px',left:'61px',right:'61px'}});await b.close()})()
