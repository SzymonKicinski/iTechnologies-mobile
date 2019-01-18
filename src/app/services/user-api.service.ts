import { API_URL } from './api-connect';
import { LoginService } from './login.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import axios, { AxiosPromise } from 'axios';
import { LeftTrimPipe } from 'ngx-pipes';
import { SessionService } from './session.service';


@Injectable()
export class UserApiService {
    startedEditing = new Subject<any>();
    path = `${API_URL}/users`;

    constructor(
        // private http: HttpClient,
        private sessionService: SessionService,
        private loginService: LoginService) {
    }

    findUserByUsername(username: string) {
        const path = this.path + `/name?username=${encodeURIComponent(username)}`;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }
        );
    }

    updateUserInfo(user, body) {
        const path = API_URL + `/users/update/info/${user.id}/${user.roleAdmin}`;
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateUser(user, body) {
        const path = API_URL + `/users/update/${user.id}`;
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateActive(user, isActiveValue) {
        const body = {
            active: isActiveValue
        };
        const path = this.path + `/updateActive/${user.id}`;
        return axios.put(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    getUserList(): any {
        const path = this.path;
        return axios.get(path, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        // .then(res => <User[]>res.data)
        // .then(data => { return data; })
    }

    setPermissionsForUsers(userList) {
        console.log(userList);
        for (let user of userList) {
            console.log(user);
            for (const userRole of user.roles) {
                console.log(userRole);
                if (userRole.name == 'admin') {
                    user.roleAdmin = true;
                    break;
                } else {
                    user.roleAdmin = false;
                }
            }
        }
        return userList;
    }

    addNewAdminUser(user) {
        const body = {
            active: user.username,
            email: user.email,
            password: user.password
        };
        const path = this.path;
        return axios.post(path, body, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    addNewUser(user) {
        try {
            return this.loginService.signUp(user.username, user.email, user.password)
        } catch (err) {
            // invalid date
            console.log(err);
        }
    }

    deleteUser(user) {
        const path = this.path + `/ ${user.id} `;
        return axios.delete(path, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
    }

    updateUserImage(user, updateUserRequest) {
        const path = API_URL + `/users/updateImage/${user.id}`;
        console.log(path);
        console.log(user);
        console.log(updateUserRequest);
        return axios.patch(path, updateUserRequest, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        )
        // .then((response => {
        //     debugger;   #TODO CORS Policy error!
        //     console.log('Response from update user image');
        //     console.log(response);
        // }
        // ))
        // .catch((error => {
        //     console.log('Error from update user image');
        //     console.log(error);
        // }));
    }
}
