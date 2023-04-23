# Documentation Help & Tips:
---

## Doxygen for microservices:

If you're working with a project that uses multiple languages, including JavaScript, Python, C#, and C++, it's best to use a documentation generator that supports all these languages. Doxygen is a good choice as it supports all these languages out of the box.

To set up Doxygen for your project, follow these steps:

1. Install Doxygen:

On Windows, you can download the installer from the [official website](https://www.doxygen.nl/download.html). On macOS, you can use Homebrew to install it:
```
brew install doxygen
```
On Linux, use the package manager for your distribution:
```
sudo apt-get install doxygen # Ubuntu/Debian
sudo yum install doxygen     # CentOS/Fedora
```
2. Generate a Doxyfile:
In your project's root directory, run:
```
doxygen -g
```
This will create a configuration file called `Doxyfile`.

3. Edit the `Doxyfile` to support your languages and project structure. For example:
```
PROJECT_NAME           = "Your Project Name"
OUTPUT_DIRECTORY       = docs
INPUT                  = src
RECURSIVE              = YES
FILE_PATTERNS          = *.js *.py *.cs *.cpp *.h
EXTRACT_ALL            = YES
EXTRACT_PRIVATE        = YES
EXTRACT_STATIC         = YES
GENERATE_HTML          = YES
GENERATE_LATEX         = YES
```
Adjust the `INPUT`, `FILE_PATTERNS`, and other settings as needed for your project.

Generate the documentation:
```
doxygen Doxyfile
```
This will generate the documentation in the specified `OUTPUT_DIRECTORY`, in this case, the `docs/` directory.

Doxygen supports a wide range of languages and is highly configurable, making it an excellent choice for projects with a diverse language stack.

---

## Documentation for JavaScript

To use Doxygen with the TypeScript server you've been working on, you'll need to follow these steps:

1. Install Doxygen, as mentioned in the previous response.

2. Generate a Doxyfile:
In your project's root directory, run:
```
doxygen -g
```
This will create a configuration file called `Doxyfile`.

3. Edit the `Doxyfile` to support TypeScript and your project structure. For example:
```
PROJECT_NAME           = "Your TypeScript Server"
OUTPUT_DIRECTORY       = docs
INPUT                  = src
RECURSIVE              = YES
FILE_PATTERNS          = *.ts
EXTRACT_ALL            = YES
EXTRACT_PRIVATE        = YES
EXTRACT_STATIC         = YES
GENERATE_HTML          = YES
GENERATE_LATEX         = YES
```
Adjust the `INPUT`, `FILE_PATTERNS`, and other settings as needed for your project.

4. Doxygen does not support TypeScript out of the box. You can use the `FILTER_PATTERNS` option in the Doxyfile to convert TypeScript files to JavaScript before parsing. Install the TypeScript compiler globally if you haven't already:
```
npm install -g typescript
```
Then, add the following line to your Doxyfile:
```
FILTER_PATTERNS        = "*.ts=tsc --allowJs --declaration --removeComments --outFile /dev/null"
```
This will tell Doxygen to run the TypeScript files through the TypeScript compiler and remove the comments before parsing them. Note that this method does not provide full TypeScript support, but it's a workaround to get basic documentation for your TypeScript files.

5. Document your TypeScript code using [JSDoc](https://jsdoc.app/) style comments. For example:
```
/**
 * This function adds two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of a and b.
 */
function add(a: number, b: number): number {
  return a + b;
}
```

6. Generate the documentation:
```
doxygen Doxyfile
```
This will generate the documentation in the specified `OUTPUT_DIRECTORY`, in this case, the `docs/` directory.

Keep in mind that this workaround does not provide full TypeScript support. If you want a more TypeScript-focused documentation generator, consider using TypeDoc.

---

## Adding Doxygen Comments

To add Doxygen comments to your source code, follow the Doxygen commenting style. Here's a brief example of how to add Doxygen comments to a C++ header file:
```
/**
 * @file example.h
 * @brief This file contains an example class declaration.
 */

/**
 * @class Example
 * @brief An example class.
 *
 * This class demonstrates how to add Doxygen comments to your source code.
 */
class Example {
public:
  /**
   * @brief Default constructor for the Example class.
   */
  Example();

  /**
   * @brief Computes the sum of two integers.
   * @param a First integer.
   * @param b Second integer.
   * @return The sum of a and b.
   */
  int sum(int a, int b);
};
```
To generate the documentation from the Doxygen comments, you'll need to have Doxygen installed on your machine. Follow these steps to generate the documentation:

1. Navigate to your project's root directory.

2. Create a Doxygen configuration file:
```
doxygen -g Doxyfile
```

3. Edit the `Doxyfile` to set the desired options for your documentation. For example, set the `OUTPUT_DIRECTORY` to `./docs`.

4. Run Doxygen to generate the documentation:
```
doxygen Doxyfile

```
5. Open the generated documentation in your web browser. For example, open `./docs/html/index.html`.
For more information on Doxygen and its features, please refer to the [official Doxygen documentation](https://www.doxygen.nl/manual/index.html).

## Seting Up Doxygen Theme

To change the theme in Doxygen, you can use the HTML_EXTRA_STYLESHEET option. Here's how you can update your Doxyfile to get a modern theme UI:

1. First, download a modern theme CSS file for Doxygen or create your own. For example, you can download the "[Doxygen-Bootstrap](https://github.com/Velron/doxygen-bootstrapped)" theme from this repository: 
2. Save the downloaded or created CSS file in a specific folder, e.g., "custom_theme".

Update your Doxyfile with the following changes:

```
PROJECT_NAME           = "Your Project Name"
OUTPUT_DIRECTORY       = docs
INPUT                  = src
RECURSIVE              = YES
FILE_PATTERNS          = *.js *.py *.cs *.cpp *.h
EXTRACT_ALL            = YES
EXTRACT_PRIVATE        = YES
EXTRACT_STATIC         = YES
GENERATE_HTML          = YES
GENERATE_LATEX         = YES
# Add the following lines:
HTML_HEADER  = Doxygen/custom_theme/header.html
HTML_FOOTER  = Doxygen/custom_theme/footer.html
HTML_STYLESHEET  = Doxygen/custom_theme/customdoxygen.css
HTML_EXTRA_STYLESHEET  = Doxygen/custom_theme/doxygen-bootstrapped.css
```
Replace `Doxygen/custom_theme/doxygen-bootstrapped.css` with the path to your downloaded or created CSS file.

Now, when you generate the documentation using Doxygen, it will use the specified modern theme.

---
[END]