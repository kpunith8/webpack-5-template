
const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
}

const updatedUser = {
  ...user,
  age: user.age + 1,
}

console.log({ user, updatedUser })

const Button = ({ css, children, ...props }) =>
  <button style={css} {...props}>{children}</button>

export default Button
