# Node.js + Express + React Project

### movie cloning project Using Node.js + Express + React
<hr/>

## 프로젝트 배경 및 동기

- 간단한 리액트 강좌 수강 중 토이프로젝트를 응용한 프론트앤드 + 백앤드 프로젝트이다

## 프로젝트 목적

- 프론트앤드 디자인과 UI개발능력 고취
- API서버를 개발함으로써 그에 대한 이해와 개발능력 향상

## 개발 환경

- 메인 서버: ****Koyeb(url)****
- 환경 : Node.js(21.2.0)
- Language : javaScript
- FrameWorks : React(18.2) , Express(4.18.2)
- DataBase:
    - MongoDB(5.7.0)
    - ODM:mongoose
- Tool: VSCode(코드 작성 IDE), PostMan(API 테스트)
- 라이브러리,패키지 : react-bootstrap(2.8.0) , chakra-ui/react(2.8.1), tsparticles(2.11.0), typewriter-effect(2.20.1) aos(animation on scroll, 2.3.4)
  <hr/>
### 주요기능
- [x] 로그인, 로그아웃
- [x] 회원가입
- [x] 회원정보관리
- [x] 장르검색
- [x] movieLike&disLike
- [x] 좋아하는 영화 목록

###### 프레임워크,런타임
- [x] Node.js
- [x] React
- [x] Express
- [x] MongoDB

###### 패키지,라이브러리
- [x] react
- [x] react-redux
- [x] react-router
- [x] babel
- [x] webpack
- [x] Express
- [x] Mongodb
- [x] Mongoose
- [x] Express
- [x] Mongodb
- [x] Mongoose
<hr/>

## API Calls:(Redux)

types.js

```jsx
export const REGISTER_USER = "register_user";
export const AUTH_USER = "auth_user";
...etc
```

reducer.js

```jsx
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SEARCHEDMOVIES:
      return { ...state, getSearchedMoviesSuccess: action.payload };
      break;
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload };
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;
...etc
```

userActions.js

```jsx
//로그인
export function loginUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/login", dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: LOGIN_USER,
    payload: request,
  };
}

//회원가입
export function registerUser(dataTosubmit) {
  const request = axios
    .post("http://localhost:4000/movies/api/users/register", dataTosubmit)
    .then((response) => response.data);
  return {
    type: REGISTER_USER,
    payload: request,
  };
}
...etc
```

router.js

```jsx
router.post("/api/users/register", async (req, res) => {
  let userInfo = new UserInfo(req.body);
  const result = await userInfo
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

//Login API
router.post("/api/users/login", async (req, res) => {
  //1. Check if there are users corresponding to db
  console.log(req);
  let userInfo = new UserInfo();
  UserInfo.findOne({ id: req.body.id })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "No users correspond to the email.",
        });
      }
      //2. If you meet the 1st condition, check if the password is correct
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        //3. When meets 2 conditions, create token
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          //Save the token. where? cookie OR local storage OR session storage
          //cookie name: value
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
            id: user.id,
            token: user.token,
            name: user.name,
          });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});
```
<hr/>

# 작동화면 

#### 1. main page

![메인페이지 (1)](https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/5d6f9738-f981-4b2c-8bfc-85a3ec2457dd)

#### 2. SignUp & Login → main page

![로그인_회원가입_AdobeExpress](https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/3005f3fc-a812-432f-985a-bc7e00d21e0a)

##### - mongoDB / generate token & encrypt password

<img width="872" alt="스크린샷 2023-12-12 오후 7 16 38" src="https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/974c33bf-a827-430d-abb4-88833d95280b">

#### 3. Update User Info

![회원정보_수정_AdobeExpress](https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/7e382a7e-06ea-4e0e-afa4-466c9d6e11c9)

##### - mongoDB / name & ID changed

<img width="797" alt="스크린샷 2023-12-12 오후 7 18 12" src="https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/70e6417e-7f13-48f8-b724-1ff11efbac5f">


#### 4. MovieDetail & Genre Search

![무비상세_장르검색_AdobeExpress](https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/fb2c2755-cc7e-46aa-8b05-bcef287df55b)

#### 5. Like Movies & LogOut

![영화좋아요_내_무비_로그아웃_AdobeExpress](https://github.com/LEEJUNGHOOON/movieCloneCoding/assets/97214215/bdb61bdc-a5c9-402d-82a5-3444a14b6995)

<hr/>

## How to run server

    git clone` git@github.com:LEEJUNGHOOON/movieCloneCoding.git

    npm i

    cd server

    npm run dev

<hr/>

배포된서버: url
<hr/>

## refernece
 >> https://nomadcoders.co/?gclid=Cj0KCQiA8aOeBhCWARIsANRFrQEG_dDbGQcm9i_qy_56R8y-i7G7POUm1YUVGWWkhqut30a4lKK96PIaAtLAEALw_wcB
