import React, {Component} from "react";

class UserForm extends Component {
    constructor(props) {
        super(props);
        let login = props.Login;
        let loginIsValid = this.validateLogin(login);

        let password = props.Password;
        let passwordIsValid = this.validatePassword(password);

        let confirmPassword = props.ConfirmPassword;

        let fullName = props.FullName;
        let fullNameIsValid = this.validateFullName(fullName);

        let gender = props.Gender;
        let genderIsValid = this.validateGender(gender);
        let isCheckedM = false, isCheckedF = false;
        if (genderIsValid === true) {
            if (this.props.gender === 'М')
                isCheckedM = true;
            else if (this.props.gender === 'Ж')
                isCheckedF = true;
        }

        let specialization = props.Specialization;
        let specializationIsValid = this.validateSpecialization(specialization);
        let isCheckedDesign = false, isCheckedProgram = false, isCheckedAdmin = false;
        if (genderIsValid === true) {
            if (this.props.specialization === 'Дизайн')
                isCheckedDesign = true;
            else if (this.props.specialization === 'Программирование')
                isCheckedProgram = true;
            else if (this.props.specialization === 'Администрирование')
                isCheckedAdmin = true;
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
            confirmPasswordValid: false,
            fullnameValid: fullNameIsValid,
            genderValid: genderIsValid,
            specializationValid: specializationIsValid,
            positionValid: positionIsValid,

            checkM: isCheckedM,
            checkF: isCheckedF,

            checkDesign: isCheckedDesign,
            checkProgram: isCheckedProgram,
            checkAdmin: isCheckedAdmin,
            submittedData: false,
            showRegForm: true,
        };

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onFullNameChange = this.onFullNameChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onSpecializationChange = this.onSpecializationChange.bind(this);
        this.onPositionChange = this.onPositionChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
    }

    validateLogin(login) {
        return login.trim().length > 3;
    }

    validatePassword(password) {
        return password.trim().length > 3 && password.trim().length < 10;
    }

    validateFullName(fullname) {
        return fullname.trim().length > 3;
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
        if (val === 'М') {
            checkm = true;
        } else if (val === 'Ж') {
            checkf = true;
        }
        let valid = this.validateGender(val);
        this.setState({gender: val, genderValid: valid, showGenderError: true, checkM: checkm, checkF: checkf});
    }

    onSpecializationChange(e) {
        let val = e.target.value;

        let checkD = false, checkP = false, checkA = false;
        if (val === 'Дизайн') {
            checkD = true;
        }
        if (val === 'Программирование') {
            checkP = true;
        }
        if (val === 'Администрирование') {
            checkA = true;
        }

        let valid = this.validateSpecialization(val);
        this.setState({
            specialization: val, specializationValid: valid,
            showSpecializationError: true, checkDesign: checkD,
            checkProgram: checkP, checkAdmin: checkA
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
            this.setState({showRegForm: false, submittedData: true});
        } else this.setState({
            showLoginError: true, showPasswordError: true,
            showConfirmPasswordError: true, showFullNameError: true, showGenderError: true,
            showSpecializationError: true, showPositionError: true,
        });
    }

    onReset(e) {
        this.reset();
    }

    onBackClick(e) {
        this.setState({showRegForm: true,});
        this.reset();
    }

    reset() {
        this.setState({
            showLoginError: false, showPasswordError: false, showConfirmPasswordError: false,
            showFullNameError: false, showGenderError: false, showSpecializationError: false,
            showPositionError: false, submittedData: false, login: '', password: '', confirmPassword: '',
            fullname: '', gender: '', specialization: '', position: 'none', checkDesign: false,
            checkProgram: false, checkAdmin: false,
        });
    }

    render() {
        let errorLoginMessage = this.state.loginValid ? "" : "Некорректная длина Логина";
        let errorPasswordMessage = this.state.passwordValid ? "" : "Некорректная длина пароля";
        let errorConfirmPasswordMessage = this.state.confirmPasswordValid ? "" : "Пароли не совпадают";
        let errorFullNameMessage = this.state.fullnameValid ? "" : "Некорректное полное имя";
        let errorGenderMessage = this.state.genderValid ? "" : "Поле пола должно быть установлено";
        let errorSpecializationMessage = this.state.specializationValid ? "" : "Поле специализации должно быть установлено";
        let errorPositionMessage = this.state.positionValid ? "" : "Поле должности должно быть установлено";

        return (
            <div>
                {this.state.showRegForm &&
                    (<form name="frm" class="wrapper" id="form" onSubmit={this.handleSubmit}>
                        <div id="form_holder1">Регистрация</div>

                        <div className="div1"> Логин:
                            <input size="26" type="text" value={this.state.login} onChange={this.onLoginChange}
                                   placeholder="Введите логин"/>
                            {this.state.showLoginError && (<label>{errorLoginMessage}</label>)}
                        </div>

                        <div className="div1"> Пароль:
                            <input value={this.state.password} onChange={this.onPasswordChange} size="26"
                                   type="password"
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
                            <input checked={this.state.checkM} value="М" type="radio" id="male" name="gender"
                                   onChange={this.onGenderChange}/> <span> M</span>
                            <input checked={this.state.checkF} value="Ж" type="radio" id="female" name="gender"
                                   onChange={this.onGenderChange}/> <span>Ж </span>
                            <br/>
                            {this.state.showGenderError && (<label>{errorGenderMessage}</label>)}
                        </div>

                        <div className="div1"> Специализация:<br/>
                            <input checked={this.state.checkDesign} onChange={this.onSpecializationChange}
                                   className="checkbox" size="26"
                                   value="Дизайн" type="checkbox" name="check1"/>
                            <span>Дизайн</span> <br/>
                            <input checked={this.state.checkProgram} onChange={this.onSpecializationChange}
                                   className="input1 checkbox"
                                   value="Программирование" size="26" type="checkbox"/>
                            <span>Программирование</span> <br/>
                            <input checked={this.state.checkAdmin} onChange={this.onSpecializationChange}
                                   className="input1 checkbox"
                                   value="Администрирование" size="26" type="checkbox" name="check1"/>
                            <span>Администрирование</span> <br/>
                            {this.state.showSpecializationError && (<label>{errorSpecializationMessage}</label>)}
                        </div>

                        <div className="div1">
                            Должность:
                            <select value={this.state.position} onChange={this.onPositionChange}>
                                <option value="none">Виберите</option>
                                <option value="Директор">Директор</option>
                                <option value="Заместитель директора">Заместитель директора</option>
                                <option value="Руководитель проекта">Руководитель проекта</option>
                                <option value="Начальник отдела">Начальник отдела</option>
                                <option value="Програмист">Програмист</option>
                                <option value="Дизайнер">Дизайнер</option>
                                <option value="Консультант">Консультант</option>
                                <option value="Служащий">Служащий</option>
                            </select>
                            {this.state.showPositionError && (<label>{errorPositionMessage}</label>)}
                            <hr/>
                        </div>

                        <div id="div3">
                            <input id="register" type="submit" value="Регистрация"/>
                            <input type="reset" value="Сброс" onClick={this.onReset}/>
                        </div>
                    </form>)}

                {this.state.submittedData && (
                    <div className="wrapperV1">
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
                        </table>
                        <div id="div3">
                            <input type="reset" value="Назад" onClick={this.onBackClick}/>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default UserForm;