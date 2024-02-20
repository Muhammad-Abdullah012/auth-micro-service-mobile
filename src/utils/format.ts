// camelCase => camel Case
export const formatCamelCase = (inputString: string) => {
  return inputString.replace(/([a-z])([A-Z])/g, "$1 $2");
};
