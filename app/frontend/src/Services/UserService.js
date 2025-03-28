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
            console.log(res);
        }
    )
    .catch((err) => {
        console.log(err);
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