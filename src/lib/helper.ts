interface FormDataObj {
    email?: string;
    name?: string
    password?: string;
    confirmPassword?: string;
    newPassword?: string;
    check?: string;
    country?: string;
    type?: string;
    checkBox?: string;
}

export const validateUserForm = (data: FormDataObj) => {

    const errors: { [key: string]: string } = {};

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email format';
    }

    if (data.name && data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters long';
    }

    if (data.password) {
        if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (data.confirmPassword && data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }

    if (data.newPassword) {
        if (data.newPassword.length < 8) {
            errors.newPassword = 'New password must be at least 8 characters long';
        }
        if (data.confirmPassword && data.newPassword !== data.confirmPassword) {
            errors.confirmPassword = 'New passwords do not match';
        }
    }

    if (data.checkBox && data.checkBox !== 'checked') {
        errors.checkBox = 'Checkbox not checked';
    }

    if (data.country && data.country.trim().length === 0) {
        errors.country = 'Country is required';
    }

    if (data.type && data.type.trim().length === 0) {
        errors.type = 'User type is required';
    }

    return errors;
}