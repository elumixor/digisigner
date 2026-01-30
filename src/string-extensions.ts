export const __dummy = {};

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface String {
    /**
     * Capitalizes the first character of the string.
     * @returns A new string with the first character converted to uppercase.
     * @example
     * "hello".capitalize() // "Hello"
     * "hello world".capitalize() // "Hello world"
     */
    capitalize(): string;

    /**
     * Replaces placeholders in the string with corresponding values.
     * Placeholders are defined using curly braces: `{key}`.
     * @param values - An object mapping placeholder keys to their replacement values.
     * @returns A new string with all placeholders replaced by their corresponding values.
     * @example
     * "Hello, {name}!".format({ name: "World" }) // "Hello, World!"
     * "{a} + {b} = {result}".format({ a: 1, b: 2, result: 3 }) // "1 + 2 = 3"
     */
    format(values: Record<string, unknown>): string;

    /**
     * Converts a string to PascalCase by splitting on hyphens, underscores, and spaces.
     * @returns A new string in PascalCase format.
     * @example
     * "hello-world".toCamelCase() // "HelloWorld"
     * "foo_bar_baz".toCamelCase() // "FooBarBaz"
     * "some text here".toCamelCase() // "SomeTextHere"
     */
    toCamelCase(): string;
  }
}

Reflect.defineProperty(String.prototype, "capitalize", {
  value(this: string) {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
});

Reflect.defineProperty(String.prototype, "format", {
  value(this: string, values: Record<string, unknown>): string {
    let result = this.toString();
    for (const [key, value] of Object.entries(values)) {
      result = result.replaceAll(`{${key}}`, String(value));
    }
    return result;
  },
});

Reflect.defineProperty(String.prototype, "toCamelCase", {
  value(this: string): string {
    return this.split(/[-_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  },
});
