import axios from 'axios';

export async function verify_user(id, image) {
    return axios.post(
        "http://127.0.0.1:4333/api/users/verify",
        {
            "id" : id,
            "image" : image
        }
    )
    .then(
        (res) => {
            return res;
        }
    )
    .catch((err) => {
        return err;
    });
}

export async function enroll_user(id, images) {
    return axios.post(
        "http://127.0.0.1:4333/api/users/enroll",
        {
            "id" : id,
            "images" : images
        }
    )
    .then(
        (res) => {
            return res;
        }
    )
    .catch(
       (err) => {
        return err;
       }
    );
}

export async function get_keys_from_user(id) {
    const token = localStorage.getItem("token");
    return axios.get(
        "http://127.0.0.1:4333/api/users/keys",
        {
            params: {
               "id": id,
            },
            headers: {
                "Authorization": "Bearer "+token,
            },
            withCredentials: false
        }
    )
    .then(
        (res) => {
            return res;
        }
    )
    .catch(
       (err) => {
        return err;
       }
    );
}