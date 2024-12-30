
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


function isValidUserInfo(user) {
  if (!user.name || !user.phone || user.age === null) {
    console.log("이름, 핸드폰번호, 나이는 필수")
    return false
  }

  const regexPhone = /^\d+$/;           // 폰 번호 숫자만 허용 (정규식 표현)
  if (!regexPhone.test(user.phone)) {
    console.log("숫자만 입력")
    return false
  }

  if (user.address && !user.addressDetail) {
    console.warn("주소는 존재하지만 상세 주소가 없습니다.")
    alert("상세 주소가 없습니다.")
    return false
  }

  return true
}


// 4. 유저 등록하는 api 호출하고 성공하면 성공 메세지 띄우고, 오류나면 오류 로깅하고 오류 메세지 띄우기
async function createUser(user) {
  if (!isValidUserInfo(user)) {
    return
  }

  try {
    const response = await axios.post('/user/create', user)
    console.log("등록 성공", response)
  } catch (error) {
    console.log("등록 중 오류", error)
  }
}

async function updateUser(user) {

  try {
    const response = await axios.post('/user/update', user)
    console.log("수정 성공", response)

  } catch (error) {
    console.log("수정 중 오류", error)
  }
}

async function deleteUser(user) {
  const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
  if (isConfirmed)
    try {
      const response = await axios.post('/user/delete', user)
      console.log('삭제 성공', response)
    } catch (error) {
      console.log("삭제 중 오류", error)
    }
}


// 5. 유저 등록 api, 수정 api, 삭제 api (backend) 만들어오기 (api 작성하면서 어떤 부분을 어떻게 생각해서 작성했는지 단계별로 적어오기)
router.post('/user/create', asyncHandling(async function (req, res) {
  const user = req.body // 유저에 대한 모든 정보 데이터

  res.json({
    res: true,
    user,
    message: '유저가 등록되었습니다.'
  })

}))
router.post('/user/update', asyncHandling(async function (req, res) {
  const { id } = req.body

  await User.update(req.body, {
    where: {
      id: id
    }
  }) // 유저에 대한 모든 정보 데이터

  const updatedUser = await User.findOne({
    where: {
      id: id
    }
  })
  res.json({
    res: true,
    user: updatedUser,
    message: '${updatedUser.name}의 정보가 수정되었습니다.'
  })
}))

router.post('/user/delete', asyncHandling(async function (req, res) {
  const { id } = req.body
  await User.destroy(req.body, {
    where: {
      id: id
    }
  })

  res.json({
    res: true,
    user: destroyedUser,
    message: '${id} 유저가 삭제되었습니다.'
  })

}))

// 만약 유저가 프로필 이미지가 있다면.... 프로필 이미지도 받아서 저장하기
// 관계 생각해오기

// User, Profile 모델을 만들고 관계를 설정한다

const User = sequelize.define('User', {
  id: { //내부에서는 얘를 쓰고
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  shortId: { //외부에서는 얘를 쓰고
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING },
  phone: { type: Sequelize.STRING },
  age: { type: Sequelize.INTEGER },
  address: { type: Sequelize.STRING },
  addressDetail: { type: Sequelize.STRING },
})

const Profile = sequelize.define('Profile', {
  imageUrl: { type: Sequelize.STRING },
})

User.hasOne(Profile, { foreignKey: 'userId' })
Profile.belongsTo(User, { foreignKey: 'userId' })

// 등록에 성공한 유저 정보 보여주기
// 프로필 이미지도 함께 가져온다
router.post('/user/item', asyncHandling(async function (req, res) {
  const { id } = req.body

  const user = await User.findOne({
    where: { id: id },
    include: [{ model: Profile, as: 'profile' }]
  })

  res.json({
    res: true,
    user,
    message: '유저 정보를 확인합니다.'
  })

}))

// 핸드폰번호 사이에 - 넣기
// 나이가 20세 이상이면 성인, 아니면 미성년자로 표시
// 주소는 addressDetail이 있으면 addressDetail을 붙여서 보여주고 없으면 address만 보여주기
// 리턴할때는 복사본을 리턴한다

function processUserInfo(user) {
  const phoneHyphen = user.phone.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)

  const ageCheck = user.age >= 20 ? '성인' : '미성년자'

  const showaddress = user.addressDetail ? `${user.address} ${user.addressDetail}` : user.address

  return {
    phone: phoneHyphen,
    age: ageCheck,
    address: showaddress
  }

}


