# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


User
1. JSX class names
        Class name	Purpose
        userTableTitle	Table title
        userTable	Main container
        addUserBtn	Add User button
        actionButtons	Action column
        editBtn	Edit button
        deleteBtn	Delete button

2. Bootstrap classes
        - btn – Button styling.
        - btn-primary – Blue button.
        - table – Table styling.
        - table-bordered – Table borders.
3. Font Awesome icons
        - fa-user-plus – Add User.
        - fa-pen-to-square – Edit.
        - fa-trash – Delete.
4. Important CSS properties
        - margin – Outside spacing.
        - padding – Inside spacing.
        - width – Element width.
        - background-color – Background color.
        - border – Border.
        - box-shadow – Shadow.
        - display – Element layout.
        - text-align – Text alignment.
5. React concepts
        - useState – Store data.
        - useEffect – Fetch data.
        - axios.get() – API request.
        - map() – Display multiple users.
        - key – Unique identification.
        - index + 1 – Serial number.
6. Files
        - User.jsx – Component and table.
        - User.css – Table styling.
        - App.jsx – Renders User.
        - main.jsx – React entry point.
        - index.html – HTML and CDN links.


## CSS Classes Used in the Project

### 1. Custom CSS Classes

| Class Name | Purpose |
|---|---|
| `userTableTitle` | Displays the User Table heading. |
| `userTable` | Main container for the table and Add User button. |
| `addUserBtn` | Styles the Add User button. |
| `actionButtons` | Aligns the Edit and Delete buttons. |
| `editBtn` | Styles the Edit button. |
| `deleteBtn` | Styles the Delete button. |

### 2. Bootstrap Classes

| Class Name | Purpose |
|---|---|
| `btn` | Applies basic Bootstrap button styling. |
| `btn-primary` | Gives the button a blue background. |
| `table` | Applies Bootstrap table styling. |
| `table-bordered` | Adds borders to the table and its cells. |

### 3. Font Awesome Classes

| Class Name | Purpose |
|---|---|
| `fa-solid` | Displays solid-style icons. |
| `fa-user-plus` | Displays the Add User icon. |
| `fa-pen-to-square` | Displays the Edit icon. |
| `fa-trash` | Displays the Delete icon. |


**Note:**
- Custom CSS classes are defined in `User.css`.
- Bootstrap classes come from the Bootstrap CDN.
- Font Awesome classes are used to display icons.
- In React JSX, use `className` instead of `class`.