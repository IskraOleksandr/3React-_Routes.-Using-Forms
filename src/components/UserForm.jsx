import React, {Component} from "react";

class UserForm extends Component {
    constructor(props) {
        super(props);
        let login = props.Login;
        let loginIsValid = this.validateLogin(login);

        let password = props.Password;
        let passwordIsValid = this.validatePassword(password);

        let confirmPassword = props.ConfirmPassword;
        // let confirmPasswordIsValid = this.validateConfirmPassword(confirmPassword);

        let fullName = props.FullName;
        let fullNameIsValid = this.validateFullName(fullName);

        let gender = props.Gender;
        let genderIsValid = this.validateGender(gender);
        let isCheckedM = false, isCheckedF = false;
        if (genderIsValid == true) {
            switch (this.props.Gender) {
                case 'М':
                    isCheckedM = true;
                    break;
                case 'Ж':
                    isCheckedF = true;
                    break;
            }
        }

        let specialization = props.Specialization;
        let specializationIsValid = this.validateSpecialization(specialization);
        let isCheckedDesign = false, isCheckedProgram = false, isCheckedAdmin = false;
        if (genderIsValid == true) {
            switch (this.props.Specialization) {
                case 'М':
                    isCheckedDesign = true;
                    break;
                case 'Ж':
                    isCheckedProgram = true;
                    break;
                case 'X':
                    isCheckedAdmin = true;
                    break;
            }
        }


        let position = props.Position_;
        let positionIsValid = this.validatePosition(position);

        this.state = {
            login: login,
            password: password,
            confirmPassword: confirmPassword,
            fullname: fullName,
            gender: gender,
            specialization: specialization,
            position: position,

            loginValid: loginIsValid,
            passwordValid: passwordIsValid,
            confirmPasswordValid: false/*confirmPasswordIsValid*/,
            fullnameValid: fullNameIsValid,
            genderValid: genderIsValid,
            specializationValid: specializationIsValid,
            positionValid: positionIsValid,

            checkM: isCheckedM,
            checkF: isCheckedF,

            checkDesign: isCheckedDesign,
            checkProgram: isCheckedProgram,
            checkAdmin: isCheckedAdmin,
            submittedData: false
        };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onFullNameChange = this.onFullNameChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onSpecializationChange = this.onSpecializationChange.bind(this);
        this.onPositionChange = this.onPositionChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateLogin(login) {
        return login.length > 2;
    }

    validatePassword(password) {
        return password.length > 2 && password.length < 11;
    }

    // validateConfirmPassword(confirmPassword) {
    //     return confirmPassword === this.state.password;
    // }

    validateFullName(fullname) {
        return fullname.length > 2;
    }

    validateGender(gender) {
        return gender !== '';
    }

    validateSpecialization(specialization) {
        return specialization !== '';
    }

    validatePosition(position) {
        return position !== 'none';
    }

    onLoginChange(e) {
        let val = e.target.value;
        let valid = this.validateLogin(val);
        this.setState({login: val, loginValid: valid, showLoginError: true});
    }

    onPasswordChange(e) {
        let val = e.target.value;
        let valid = this.validatePassword(val);
        this.setState({password: val, passwordValid: valid, showPasswordError: true});
    }

    onConfirmPasswordChange(e) {
        let val = e.target.value;
        let valid = val === this.state.password;
        this.setState({confirmPassword: val, confirmPasswordValid: valid, showConfirmPasswordError: true});
    }

    onFullNameChange(e) {
        let val = e.target.value;

        let valid = this.validateFullName(val);
        this.setState({fullname: val, fullnameValid: valid, showFullNameError: true});
    }

    onGenderChange(e) {
        let val = e.target.value;

        let checkm = false, checkf = false;
        if (this.props.gender == 'M') {
            checkm = true;
        } else if (this.props.gender == 'Ж') {
            checkf = true;
        }
        let valid = this.validateGender(val);
        this.setState({gender: val, genderValid: valid, showGenderError: true, checkedM: checkm, checkedF: checkf});
    }

    onSpecializationChange(e) {
        let val = e.target.value;
        let checkD = false, checkP = false, checkA = false;
        if (this.props.gender == 'Design') {
            checkD = true;
        } else if (this.props.gender == 'Program') {
            checkP = true;
        } else if (this.props.gender == 'Admin') {
            checkA = true;
        }

        let valid = this.validateSpecialization(val);
        this.setState({
            specialization: val,
            specializationValid: valid,
            showSpecializationError: true,
            checkDesign: checkD,
            checkProgram: checkP,
            checkAdmin: checkA
        });
    }

    onPositionChange(e) {
        let val = e.target.value;
        let valid = this.validatePosition(val);
        this.setState({position: val, positionValid: valid, showPositionError: true});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (
            this.state.loginValid === true && this.state.passwordValid === true &&
            this.state.confirmPasswordValid === true && this.state.fullnameValid === true &&
            this.state.genderValid === true && this.state.specializationValid === true &&
            this.state.positionValid === true
        ) {
            this.setState({submittedData: true});
            alert(
                "Имя: " + this.state.login + "\nФамилия: " + this.state.password +
                "\nВозраст: " + this.state.confirmPassword + "\nРейтинг: " + this.state.fullname +
                "\nРейтинг: " + this.state.gender + "\nРейтинг: " + this.state.specialization +
                "\nРейтинг: " + this.state.position
            );
        } else this.setState({
            showLoginError: true, showPasswordError: true,
            showConfirmPasswordError: true, showFullNameError: true, showGenderError: true,
            showSpecializationError: true, showPositionError: true,
        });
    }

    render() {
        let errorLoginMessage = this.state.loginValid ? "" : "Некорректная длина Логина";
        let errorPasswordMessage = this.state.passwordValid ? "" : "Некорректная длина Логина";
        let errorConfirmPasswordMessage = this.state.confirmPasswordValid ? "" : "Некорректная длина Логина";
        let errorFullNameMessage = this.state.fullnameValid ? "" : "Некорректная длина Логина";
        let errorGenderMessage = this.state.genderValid ? "" : "Некорректная длина Логина";
        let errorSpecializationMessage = this.state.specializationValid ? "" : "Некорректная длина Логина";
        let errorPositionMessage = this.state.positionValid ? "" : "Некорректная длина Логина";

        return (
            <div>
                <form name="frm" class="wrapper" id="form" onSubmit={this.handleSubmit}>
                    <div id="form_holder1">Регистрация</div>

                    <div className="div1"> Логин:
                        <input size="26" type="text" value={this.state.login} onChange={this.onLoginChange}
                               placeholder="Введите логин"/>
                        {this.state.showLoginError && (<label>{errorLoginMessage}</label>)}
                    </div>

                    <div className="div1"> Пароль:
                        <input value={this.state.password} onChange={this.onPasswordChange} size="26" type="password"
                               placeholder="Введите пароль"/>
                        {this.state.showPasswordError && <label>{errorPasswordMessage}</label>}
                    </div>

                    <div className="div1"> Подтверждение пароля:
                        <input value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange} size="26"
                               type="password" placeholder="Подтверждение пароля"/>
                        {this.state.showConfirmPasswordError && <label>{errorConfirmPasswordMessage}</label>}
                    </div>

                    <div className="div1"> Полное имя:
                        <input value={this.state.fullname} onChange={this.onFullNameChange} size="26" type="text"
                               placeholder="Имя Фамилия"/>
                        {this.state.showFullNameError && (<label>{errorFullNameMessage}</label>)}
                    </div>

                    <div className="div1"> Пол:
                        <input checked={this.state.isCheckedM} value="М" type="radio" id="male" name="gender"
                               onChange={this.onGenderChange}/> <span> M</span>
                        <input checked={this.state.isCheckedF} value="Ж" type="radio" id="female" name="gender"
                               onChange={this.onGenderChange}/> <span>Ж </span>
                        <br/>
                        {this.state.showGenderError && (<label>{errorGenderMessage}</label>)}
                    </div>

                    <div className="div1"> Специализация:<br/>
                        <input checked={this.state.isCheckedDesign} onChange={this.onSpecializationChange}
                               className="checkbox" size="26"
                               value="Design" type="checkbox" name="check1"/>
                        <span>Дизайн</span> <br/>
                        <input checked={this.state.isCheckedProgram} onChange={this.onSpecializationChange}
                               className="input1 checkbox"
                               value="Program" size="26" type="checkbox"/>
                        <span>Программирование</span> <br/>
                        <input checked={this.state.isCheckedAdmin} onChange={this.onSpecializationChange}
                               className="input1 checkbox"
                               value="Admin" size="26" type="checkbox" name="check1"/>
                        <span>Администрирование</span> <br/>
                        {this.state.showSpecializationError && (<label>{errorSpecializationMessage}</label>)}
                    </div>

                    <div className="div1">
                        Должность:
                        <select value={this.state.position} onChange={this.onPositionChange}>
                            <option value="none">-----------------Виберите-----------------</option>
                            <option value="director">Директор</option>
                            <option value="deputyDirector">Заместитель директора</option>
                            <option value="projectManager">Руководитель проекта</option>
                            <option value="departmentHead">Начальник отдела</option>
                            <option value="programmer">Програмист</option>
                            <option value="designer">Дизайнер</option>
                            <option value="consultant">Консультант</option>
                            <option value="employee">Служащий</option>
                        </select>
                        {this.state.showPositionError && (<label>{errorPositionMessage}</label>)}
                        <hr/>
                    </div>

                    <div id="div3">
                        <input id="register" type="submit" value="Регистрация"/>
                        <input type="reset" value="Сброс" onClick={this.onReset}/>
                    </div>
                </form>

                    {this.state.submittedData && (
                        <div className="wrapper">
                        <table>
                            <tbody>
                            <tr>
                                <th colSpan="2">Введенные данные</th>
                            </tr>
                            <tr>
                                <th>Логин:</th>
                                <td>{this.state.login}</td>
                            </tr>
                            <tr>
                                <th>Пароль:</th>
                                <td>{this.state.password}</td>
                            </tr>
                            <tr>
                                <th>Подтверджение пароля:</th>
                                <td>{this.state.confirmPassword}</td>
                            </tr>
                            <tr>
                                <th>Полное имя:</th>
                                <td>{this.state.fullname}</td>
                            </tr>
                            <tr>
                                <th>Пол:</th>
                                <td>{this.state.gender}</td>
                            </tr>
                            <tr>
                                <th>Специализация:</th>
                                <td>{this.state.specialization}</td>
                            </tr>
                            <tr>
                                <th>Должность:</th>
                                <td>{this.state.position}</td>
                            </tr>
                            </tbody>
                        </table></div>
                    )}

            </div>
        );
    }
}

export default UserForm;