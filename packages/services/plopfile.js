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

  // Domain Generator
  plop.setGenerator("domain", {
    description: "Generate a new service domain with Screaming Architecture",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Domain name (camelCase, e.g., user, userSettings, blogPost):",
        validate: (value) => {
          if (!value) {
            return "Domain name is required";
          }
          // biome-ignore lint/performance/useTopLevelRegex: regex used in validation function
          if (!/^[a-z][a-zA-Z0-9]*$/.test(value)) {
            return "Domain name must be in camelCase (e.g., user, userSettings)";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "Brief description of the domain:",
        default: (answers) => `${answers.name} domain service`,
      },
      {
        type: "confirm",
        name: "hasUpdate",
        message: "Does this domain have an update mutation?",
        default: true,
      },
      {
        type: "confirm",
        name: "hasDelete",
        message: "Does this domain have a delete mutation?",
        default: false,
      },
      {
        type: "confirm",
        name: "hasCreate",
        message: "Does this domain have a create mutation?",
        default: false,
      },
    ],
    actions: (data) => {
      const actions = [];
      const basePath = "src/domains/{{camelCase name}}";

      // Generate all domain files
      actions.push(
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.types.ts`,
          templateFile: "plop/templates/domain.types.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.schemas.ts`,
          templateFile: "plop/templates/domain.schemas.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.service.ts`,
          templateFile: "plop/templates/domain.service.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.queries.ts`,
          templateFile: "plop/templates/domain.queries.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.mutations.ts`,
          templateFile: "plop/templates/domain.mutations.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/{{camelCase name}}.hooks.ts`,
          templateFile: "plop/templates/domain.hooks.ts.hbs",
        },
        {
          type: "add",
          path: `${basePath}/index.ts`,
          templateFile: "plop/templates/domain.index.ts.hbs",
        }
      );

      // Update main index.ts to export the new domain
      actions.push({
        type: "append",
        path: "src/index.ts",
        pattern: /(\/\/ Domain exports)/gi,
        template: "export * from './domains/{{camelCase name}}';",
      });

      // Success message
      actions.push(() => {
        const domainName = data.name;
        const path = `src/domains/${plop.getHelper("camelCase")(data.name)}`;

        return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Domain "${domainName}" created successfully!

📁 Location: ${path}/

Files generated:
  ✓ ${plop.getHelper("camelCase")(data.name)}.types.ts
  ✓ ${plop.getHelper("camelCase")(data.name)}.schemas.ts
  ✓ ${plop.getHelper("camelCase")(data.name)}.service.ts
  ✓ ${plop.getHelper("camelCase")(data.name)}.queries.ts
  ✓ ${plop.getHelper("camelCase")(data.name)}.mutations.ts
  ✓ ${plop.getHelper("camelCase")(data.name)}.hooks.ts
  ✓ index.ts
  ✓ Updated src/index.ts

🎯 Next steps:
  1. Define your types in ${plop.getHelper("camelCase")(data.name)}.types.ts
  2. Add Zod schemas in ${plop.getHelper("camelCase")(data.name)}.schemas.ts
  3. Implement API calls in ${plop.getHelper("camelCase")(data.name)}.service.ts
  4. Customize queries in ${plop.getHelper("camelCase")(data.name)}.queries.ts
  5. Add mutations in ${plop.getHelper("camelCase")(data.name)}.mutations.ts

📚 Import your domain:
  import { use${plop.getHelper("pascalCase")(data.name)} } from '@superapp/services/domains/${plop.getHelper("camelCase")(data.name)}';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `;
      });

      return actions;
    },
  });
}
