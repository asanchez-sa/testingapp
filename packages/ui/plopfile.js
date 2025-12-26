export default function (plop) {
  // Custom helpers
  plop.setHelper("constantCase", (text) => {
    return text
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toUpperCase();
  });

  plop.setHelper("capitalizeFirst", (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  });

  plop.setHelper("lowerCase", (text) => {
    return text.toLowerCase();
  });

  plop.setHelper("eq", (a, b) => {
    return a === b;
  });

  // Component Generator
  plop.setGenerator("component", {
    description: "Generate a new UI component with all required files",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g., Avatar, InputField):",
        validate: (value) => {
          if (!value) {
            return "Component name is required";
          }
          // biome-ignore lint/performance/useTopLevelRegex: regex used in validation function
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
            return "Component name must be in PascalCase (e.g., Avatar, InputField)";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "atomicLevel",
        message: "Select Atomic Design level:",
        choices: [
          { name: "Atoms (basic building blocks)", value: "atoms" },
          { name: "Molecules (simple combinations)", value: "molecules" },
          { name: "Organisms (complex components)", value: "organisms" },
          { name: "Templates (page layouts)", value: "templates" },
        ],
        default: "atoms",
      },
      {
        type: "input",
        name: "description",
        message: "Brief description of the component:",
        default: (answers) => `${answers.name} component`,
      },
      {
        type: "confirm",
        name: "hasVariants",
        message:
          "Does this component have visual variants (e.g., primary, secondary)?",
        default: true,
      },
      {
        type: "confirm",
        name: "hasSizes",
        message:
          "Does this component have different sizes (e.g., small, medium, large)?",
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [];
      const basePath = "src/components/{{atomicLevel}}/{{kebabCase name}}";

      // Generate all 7 required files
      actions.push(
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.tsx`,
          templateFile: "plop/templates/component.tsx.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.types.ts`,
          templateFile: "plop/templates/types.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.constants.ts`,
          templateFile: "plop/templates/constants.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.styles.ts`,
          templateFile: "plop/templates/styles.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.md`,
          templateFile: "plop/templates/documentation.md.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{kebabCase name}}.stories.tsx`,
          templateFile: "plop/templates/stories.tsx.hbs",
        },
        {
          type: "add",
          path: `${basePath}/index.ts`,
          templateFile: "plop/templates/index.ts.hbs",
        }
      );

      // Update the atomic level index.ts to export the new component
      actions.push({
        type: "append",
        path: "src/components/{{atomicLevel}}/index.ts",
        pattern: /(\/\/ Export all .*)/gi,
        template: "export * from './{{kebabCase name}}';",
      });

      // Success message
      actions.push(() => {
        const componentName = data.name;
        const level = data.atomicLevel;
        const path = `src/components/${level}/${plop.getHelper("kebabCase")(data.name)}`;

        return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Component "${componentName}" created successfully!

📁 Location: ${path}/

Files generated:
  ✓ ${plop.getHelper("kebabCase")(data.name)}.tsx
  ✓ ${plop.getHelper("kebabCase")(data.name)}.types.ts
  ✓ ${plop.getHelper("kebabCase")(data.name)}.constants.ts
  ✓ ${plop.getHelper("kebabCase")(data.name)}.styles.ts
  ✓ ${plop.getHelper("kebabCase")(data.name)}.md
  ✓ ${plop.getHelper("kebabCase")(data.name)}.stories.tsx
  ✓ index.ts
  ✓ Updated src/components/${level}/index.ts

🎯 Next steps:
  1. Customize the component implementation in ${plop.getHelper("kebabCase")(data.name)}.tsx
  2. Adjust styles in ${plop.getHelper("kebabCase")(data.name)}.styles.ts
  3. Update documentation in ${plop.getHelper("kebabCase")(data.name)}.md
  4. Test in Storybook:
     cd ../../apps/storybook
     bun run dev

📚 Import your component:
  import { ${componentName} } from '@superapp/ui/components/${level}/${plop.getHelper("kebabCase")(data.name)}';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `;
      });

      return actions;
    },
  });
}
