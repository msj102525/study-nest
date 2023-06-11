## Read.me

```bash

```

## User

```bash
$ user CR

# 회원가입
# POST: localhost:3000/auth/register
$
    "username": "username",
    "email": "email@email.com",
    "password": "password"

# 로그인
# POST: localhost:3000/auth/login
$
  "email": "msj10@email.com",
  "password": "Tmdwhd0711!"

# 토큰을 통해 로그인한 유저의 정보 가져오기
# GET: localhost:3000/auth/authentcate
$ postman -> Authorization 클릭 -> Type: Bearer Token -> 로그인한 토큰 ctrl + c, ctrl + v -> get요청

```

## Post

```bash
$ post CRUD

# post 등록 (CREATE)
# POST: localhost:3000/post
# 로그인 필요 토큰 담아서 글쓰면 그 유저의 id값이 post table의 user_id column에 추가
$ body ->
          "title":"DoorWinBell10",
          "content": "가을 하늘 공활한데 높고 구름 없이"


# 전체 post get (READ)
# GET: localhost:3000/post
$ post정보와 post 주인의 정보

# user의 포스트 가져오기 (READ)
# 로그인 필요, 토큰 담아서 요청
# GET: localhost:3000/post/user
$ 로그인 한 유저의 post가져오기

# post 수정 (UPDATE)
# PATCH: localhost:3000/post/:id
# post id로 조회후 body에 수정할 내용
$
    "title": "수정할 내용",
    "content": "수정할 내용"

# post 삭제 (DELETE)
# DELETE: localhost:3000/post/:id
# post id로 조회후 해당 post 삭제
$
    "title": "수정할 내용",
    "content": "수정할 내용"

```

# TEST

```bash
$ npm run test
```
