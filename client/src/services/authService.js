import { userLogin, userRegister } from '../redux/features/auth/authAction';
import store from '../redux/Store';

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            return alert('Please provide all fields');
        }

        // Dispatch the login action with the necessary parameters
        store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (
    e,
    name,
    role,
    email,
    password,
    organisationName,
    hospitalName,
    website,
    address,
    phone
) => {
    e.preventDefault();

    return new Promise((resolve, reject) => {
        try {
            if (!name || !role || !email || !password) {
                alert('Please provide all required fields');
                return reject('Missing required fields');
            }

            // Dispatch the registration action
            store
                .dispatch(
                    userRegister({
                        name,
                        role,
                        email,
                        password,
                        organisationName,
                        hospitalName,
                        website,
                        address,
                        phone,
                    })
                )
                .then((result) => {
                    // Resolve the Promise with the result
                    resolve(result);
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    reject(error);
                });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
