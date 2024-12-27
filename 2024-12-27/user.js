
const user = {
  name: '',
  phone: '',
  age: null,
  address: '',
  addressDetail: '',
}

// 정보에 들어갈 때 자료형이나 오류가 생길만한 엣지케이스를 잘 생각해서 작성한다.

// 유저의 정보를 받아서 유효성 검사

// 1. 핸드폰 번호에서 숫자 외의 것이 들어오면 안됨
// 2. 이름, 핸드폰번호, 나이 정보는 필수
// 3. address가 있는데 addressDetail이 없는 경우 한번 경고문구 띄우고 그 이후 기능은 실행되지 않게

function isValidUserInfo() {

}

// 4. 유저 등록하는 api 호출하고 성공하면 성공 메세지 띄우고, 오류나면 오류 로깅하고 오류 메세지 띄우기
async function createUser() {

}

async function updateUser() {

}

async function deleteUser() {

}

// 5. 유저 등록 api, 수정 api, 삭제 api (backend) 만들어오기 (api 작성하면서 어떤 부분을 어떻게 생각해서 작성했는 지 단계별로 적어오기)
router.post('/user/create', asyncHandling(async function (req, res) {


  res.json({
    res: true,
  })

}))
router.post('/user/update', asyncHandling(async function (req, res) {

  res.json({
    res: true,
  })

}))
router.post('/user/delete', asyncHandling(async function (req, res) {

  res.json({
    res: true,
  })

}))

// 만약 유저가 프로필 이미지가 있다면.... 프로필 이미지도 받아서 저장하기
// 관계 생각해오기

// User, Profile 모델을 만들고 관계를 설정한다



// 등록에 성공한 유저 정보 보여주기
// 프로필 이미지도 함께 가져온다
router.post('/user/item', asyncHandling(async function (req, res) {

  res.json({
    res: true,
  })

}))

// 핸드폰번호 사이에 - 넣기
// 나이가 20세 이상이면 성인, 아니면 미성년자로 표시
// 주소는 addressDetail이 있으면 addressDetail을 붙여서 보여주고 없으면 address만 보여주기
// 리턴할때는 복사본을 리턴한다

function processUserInfo() {

}





