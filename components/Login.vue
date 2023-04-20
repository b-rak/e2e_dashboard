<template>
    <div class="form-container">
        <h2>Login Form</h2>
        <form action="/login" method="POST">
            <label for="username">Username</label>
            <input id="username" type="text" name="username" required>
            
            <label for="password">Password</label>
            <input id="password" type="password" name="password" required>

            <button type="submit">Login</button>
        </form>
        <div class="error-message">This is an error 🤖</div>
    </div>
</template>

<style scoped>
    /* Add CSS styles for the form container */
    .form-container {
        margin: 50px auto;
        max-width: 400px;
        padding: 20px;
        background-color: #f2f2f2;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #ccc;
        display: flex;

    }

    /* Add CSS styles for form inputs */
    input[type=text], input[type=password] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    /* Add CSS styles for submit button */
    button[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        width: 100%;
    }

    /* Add CSS styles for error message */
    .error-message {
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
    }
</style>