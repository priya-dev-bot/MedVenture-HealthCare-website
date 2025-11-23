/*import bcrypt from "bcryptjs";

// Generate a salt (a random string to make the hash unique)
const salt = bcrypt.genSaltSync(10);

// Hash the password
const password = "priyanka123"; // The plain text password
const hashedPassword = bcrypt.hashSync(password, salt);

console.log("Hashed Password:", hashedPassword);


*/


import bcrypt from "bcryptjs";

// Original password
const plainPassword = "priyanka123";

// Hashed password stored in your Admin schema
const storedHash = "$2b$10$Ug9XSti5xb/JHt1Xg3wiYupZa7guoOBsXdppuaPMmmximI9KBLYq2";

// Compare password
bcrypt.compare(plainPassword, storedHash).then((match) => {
  console.log("Password Match:", match); // Should print true if correct
});
