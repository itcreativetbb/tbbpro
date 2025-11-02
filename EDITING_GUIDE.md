# TBB Website Documentation

## Table of Contents
1. [Project Structure](#project-structure)
2. [Page Editing Guide](#page-editing-guide)
3. [Components Guide](#components-guide)
4. [AI Integration Guide](#ai-integration-guide)
5. [Styling Guide](#styling-guide)
6. [Development Workflow](#development-workflow)

## Project Structure

```plaintext
src/
├── components/      # Reusable UI components
├── content/         # Blog posts and content
├── layouts/         # Page layouts
├── pages/          # Main pages
├── styles/         # CSS styles
└── utils/          # Utility functions
```

## Page Editing Guide

### Home Page (`src/pages/index.astro`)
- Location: `src/pages/index.astro`
- Purpose: Main landing page
- How to edit:
  1. Open `src/pages/index.astro`
  2. The page is divided into sections:
     - Hero section: Update intro text
     - Projects section: Edit projects in `src/constants/projects.json`
     - About section: Modify content in `src/utils/aboutMe.ts`

### AI Page (`src/pages/ai.astro`)
- Location: `src/pages/ai.astro`
- Components used: `LakshAI.tsx`
- How to edit:
  1. AI Chat Component (`src/components/react/LakshAI.tsx`):
     - Modify chat interface in `LakshAI.tsx`
     - Edit pre-defined questions in the buttons section
     - Update API integration in `src/pages/api/chat.ts`
  2. Style customization:
     - Chat bubbles: Edit classes in component
     - Colors: Modify Tailwind classes
  3. AI Personality:
     - Edit greeting message
     - Modify error messages
     - Update AI persona description

### Resume Page (`src/pages/resume.astro`)
- Location: `src/pages/resume.astro`
- How to edit:
  1. Update resume PDF:
     - Replace file in `public/docs/Resume.pdf`
  2. Modify page content:
     - Edit meta description
     - Update page title
     - Change resume preview settings

### Thoughts Page (`src/pages/thoughts/`)
- Main listing: `src/pages/thoughts/index.astro`
- Individual posts: `src/content/thoughts/*.mdx`
- How to edit:
  1. Add new blog post:
     ```markdown
     # In src/content/thoughts/your-post.mdx
     ---
     title: "Your Post Title"
     publishedAt: 2025-11-02
     description: "Post description"
     ---
     Your content here...
     ```
  2. Edit existing posts:
     - Navigate to `src/content/thoughts/`
     - Edit `.mdx` files directly
  3. Modify layout:
     - Edit `src/layouts/ThoughtsLayout.astro`

### Colophon Page (`src/pages/colophon.astro`)
- Location: `src/pages/colophon.astro`
- How to edit:
  1. Update tech stack list
  2. Modify personal tools section
  3. Edit page description

## Components Guide

### Navigation (`src/components/Nav.astro`)
- Edit navigation items
- Modify mobile menu
- Update logo and links

### Footer (`src/components/Footer.astro`)
- Update social links in `src/constants/socials.json`
- Modify footer content
- Edit copyright information

### ProjectCard (`src/components/ProjectCard.astro`)
- Used for displaying projects
- Edit card layout and styling
- Modify project information display

## AI Integration Guide

### LakshAI Component (`src/components/react/LakshAI.tsx`)
1. Customizing Chat Interface:
```typescript
// Edit chat bubble styles
const chatBubbleStyles = {
  user: "rounded-full bg-blue-100 text-blue-700",
  ai: "rounded-full bg-green-100 text-emerald-700"
};

// Modify pre-defined questions
const predefinedQuestions = [
  "What is your design philosophy?",
  "Are you available for hire?",
  // Add more questions
];
```

2. Modifying AI Behavior:
- Edit API endpoint in `src/pages/api/chat.ts`
- Update error handling
- Modify response formatting

3. Styling Chat Interface:
- Edit Tailwind classes for chat container
- Modify animation settings
- Update input field styling

## Styling Guide

### Global Styles
1. Edit `src/styles/global.css`:
   - Modify base styles
   - Update color variables
   - Edit typography settings

2. Tailwind Configuration:
   - Update theme in `tailwind.config.js`
   - Add custom colors
   - Modify breakpoints

### Component-Specific Styles
- Use Tailwind classes directly in components
- Add custom CSS in component files when needed
- Maintain consistent color scheme

## Development Workflow

### Running Locally
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Making Changes
1. Create new branch:
```bash
git checkout -b feature/your-feature
```

2. Make changes and test locally

3. Commit changes:
```bash
git add .
git commit -m "Description of changes"
```

4. Push to GitHub:
```bash
git push origin feature/your-feature
```

### Best Practices
1. Always test changes locally first
2. Use consistent commit messages
3. Keep components modular and reusable
4. Document significant changes
5. Update this guide when adding new features

## Additional Resources
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Need Help?
For any questions or issues:
1. Check the existing code for examples
2. Review component implementations
3. Test changes in development environment
4. Commit only working changes