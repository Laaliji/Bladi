const fs = require('fs');
const path = require('path');

const dir = './components/turath/screens';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Specifically target the top-level wrappers that might obscure the global patterned background
      content = content.replace(/className="h-full flex flex-col bg-background/g, 'className="h-full flex flex-col');
      content = content.replace(/className="h-full flex flex-col bg-background relative"/g, 'className="h-full flex flex-col relative"');
      content = content.replace(/className="h-full flex flex-col bg-card/g, 'className="h-full flex flex-col');
      content = content.replace(/className="flex-1 bg-background"/g, 'className="flex-1"');
      content = content.replace(/className="flex-1 overflow-y-auto bg-background"/g, 'className="flex-1 overflow-y-auto"');

      // For solid elements inside screens that are meant to be semi-transparent to show the pattern:
      // Replace solid bg-card with bg-card/90 or similar if we want (optional, maybe keep bg-card as is to maintain contrast).
      // Let's replace solid `bg-background` in cards with `bg-background/90` or `bg-background/80 backdrop-blur-md`
      // Wait, let's keep it simple first. Just removing the solid backgrounds from the main wrappers is enough.
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${fullPath}`);
    }
  }
}

processDirectory(dir);
console.log('Background class removal completed.');
