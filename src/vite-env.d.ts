/// <reference types="vite/client" />

// Declaración para archivos JSON
declare module "*.json" {
  const value: any;
  export default value;
}

// Declaración para resume.json específicamente
declare module "./resume.json" {
  const value: any;
  export default value;
}
