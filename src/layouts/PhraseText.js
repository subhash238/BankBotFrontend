export const parseContent = (text) => {
  // Split the text by lines
  const lines = text.split('\n').map(line => line.trim());

  const sections = [];
  let currentSection = { title: '', points: [] };

  for (let line of lines) {
    if (!line) continue; // skip empty lines

    // Detect section titles by pattern "number. Title:"
    const sectionMatch = line.match(/^(\d+)\.\s+(.*):$/);
    if (sectionMatch) {
      // Push previous section if exists
      if (currentSection.title) sections.push(currentSection);

      currentSection = { title: sectionMatch[2], points: [] };
    } else if (line.startsWith('-')) {
      // It's a list point
      currentSection.points.push(line.replace(/^- /, ''));
    } else {
      // If it's the first line (intro paragraph), or any leftover
      if (!currentSection.title && currentSection.points.length === 0) {
        currentSection.title = ''; // no title
        currentSection.points.push(line);
      } else {
        // Just add as paragraph text inside points array
        currentSection.points.push(line);
      }
    }
  }
  if (currentSection.title || currentSection.points.length) {
    sections.push(currentSection);
  }

  return sections;
};