import config from "@syracrm/eslint-config";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["prisma/seed/*.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
