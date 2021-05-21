# SSACON(SSAFY with BEACON)

### SAMSUNG SDI 기업연계

SSACON은 Samsung SDI와 기업연계 프로젝트로 '라인 내 리스크 제로화'라는 주제로 

비콘을 활용한 근무자 위치 모니터링, 온/습도 경보, 인수인계 로그, 교육장 출석 기능을 제공합니다.

  - beacon의 포그라운드, 백그라운드 스캔 제공

  - beacon 온/습도 센서 정보 제공

  - 이상상황 발생시 알람 생성

  - 근무자 인수인계

  - 근무자 교육장 자동 출석

  - 체크시트 제출 장소 제공

    

## DEMO 

 https://www.youtube.com/watch?v=WqSObm91UTg



## 목차
* [설치](#설치)
* [사용 가이드](#사용-가이드)
* [API 문서](#api-문서)
* [참고 사항](#참고-사항)
* [고객 문의](#고객-문의)



## 설치

SSACON을 직접 실행하기 위해서는 Cordova 설치가 필요합니다. 참고 url

```url
https://cordova.apache.org/
```



## 사용 가이드
### 설정



#### Cordova plugins

Cordova 기반의 개발 환경은 아래와 같이 프로젝트 Root 디렉토리에서 Cordova CLI 를 통해 의존 Cordova 플러그인들을 설치 해야합니다.



##### cordova-plugin-ble-central

BLE 통신을 위한 플러그인 입니다.

```
$ cordova plugin add cordova-plugin-ble-central
```



##### cordova-plugin-background-mode

백그라운드 모드 스캔을 지원하기 위한 플러그인 입니다.

```
$ cordova plugin add cordova-plugin-background-mode
```



##### cordova-plugin-androidx-adapter

Android 10이상 백그라운드 모드 스캔을 지원하기 위한 플러그인 입니다.

```
$ cordova plugin add cordova-plugin-androidx-adapter
```



##### cordova-plugin-local-notification

Android 알림을 지원하기 위한 플러그인 입니다.

```
$ cordova plugin add cordova-plugin-local-notification
```



#### platforms/android/app/src/main/AndroidManifest.xml
App의 AndroidManifest.xml 파일을 추가합니다.

(For. android10 이상 background Scan, fetch api)

```xml
<?xml version='1.0' encoding='utf-8'?>
...
<application android:hardwareAccelerated="true" android:icon="@mipmap/ic_launcher" android:label="@string/app_name" android:supportsRtl="true" android:usesCleartextTraffic="true">
</application>
...
 <uses-feature android:name="android.hardware.location.gps" />
...

```


##### Webpack 

`Cordova, PhoneGap CLI 로 생성한 프로젝트의 경우, 기본 번들러(Bundler)가 존재하지 않습니다.` 이에 따라, webpack 등의 번들러를 통하여 bundle.js를 생성하여 사용해야하므로 webpack 과 같은 JS 모듈 번들러를 설치합니다.

```
$ npm install -g webpack
```



아래 명령어를 입력하여 JS 파일을 번들링하고 ./www/dist/js/[name].js 파일을 생성합니다.

```
$ webpack
```



## API 문서
기본 url : http://k4b101.p.ssafy.io/api/swagger-ui.html#/api

## 1. Alarm

### 1.1 [GET]  /alarm/{userId}

- 알람 전체 목록 불러오기

#### 1.1.1 입력 형태

```js
{userId}: 불러오고자 하는 유저의 id
```



#### 1.1.2 출력 형태

##### 1.1.2.1 성공시

```json
{
    "status": true,
    "data": [
        {
            "id": 140, //알람 id값
            "type": "checksheet", // 알람 type
            "line": "l101", // 해당 알람이 참조할 라인 이름
            "equipment": "상온에이징", // 해당 알람이 참조할 설비 이름
            "beaconId": null, // 해당 알람이 발생한 비콘 id
            "writer": null, // 인수인계를 작성한 사람의 이름
            "description": null, // 인수인계 내용
            "time": "2021-05-18T06:27:20.000+00:00", // 알람이 생성된 시간
            "properBeaconId": "D4:5C:67:6A:7A:7A", // 원래 제출되어야 하는 체크시트의 비콘 id
            "submissionBeaconId": "E7:C5:64:4E:66:2B", // 제출된 체크시트의 위치 비콘 id
            "minProperHumidity": 0, // 해당 비콘의 최저 습도
            "maxProperHumidity": 0, // 해당 비콘의 최대 습도
            "minProperTemperature": 0, // 해당 비콘의 최저 온도
            "maxProperTemperature": 0, // 해당 비콘의 최대 온도
            "nowHumidity": 0, // 현재 해당 비콘의 습도
            "nowTemperature": 0, // 현재 해당 비콘의 온도
            "session": null, // 참여한 교육의 이름
            "battery": 0 // 현재 비콘의 배터리 잔량
        },
        .....
        ,
        {}
    ]
}
```



##### 1.1.2.2 실패시

```json
{
    "status": false,
}
```



### 1.2 [DELETE]  /alarm/{userId}/{alarmId}

- 알람 한개 삭제



#### 1.2.1 입력형태

```js
{userId}: 알람을 삭제하려는 user의 id
{alarmId}: 삭제하고자하는 알람의 id 
```



#### 1.2.2 출력형태

##### 1.2.2.1 성공시

```json
{
    "status": true
}
```

##### 1.2.2.2 실패시

```json
{
    "status": false
}
```



### 1.3 [GET]  /alarm/admin/{userId}

- 관리자 알람 확인



#### 1.3.1 입력형태

```js
{userId}: 알람을 확인하고자 하는 관리자의 id
```



#### 1.3.2 출력형태

- 알람 전체 목록 불러오기와 동일



### 1.4 [GET]  /alarm/one/{alarmId}

- 특정 알람 한개 불러오기

#### 1.4.1 입력형태

```js
{alarmId}: 불러오고자 하는 알람의 id
```



#### 1.4.2 출력형태

##### 1.4.2.1 성공시

```json
{
    "status": true,
    "data": {
        "id": "", //알람 id값
        "type": "", // 알람 type
        "line": "", // 해당 알람이 참조할 라인 이름
        "equipment": "", // 해당 알람이 참조할 설비 이름
        "beaconId": null, // 해당 알람이 발생한 비콘 id
        "writer": null, // 인수인계를 작성한 사람의 이름
        "description": null, // 인수인계 내용
        "time": "", // 알람이 생성된 시간
        "properBeaconId": "", // 원래 제출되어야 하는 체크시트의 비콘 id
        "submissionBeaconId": "", // 제출된 체크시트의 위치 비콘 id
        "minProperHumidity": 0, // 해당 비콘의 최저 습도
        "maxProperHumidity": 0, // 해당 비콘의 최대 습도
        "minProperTemperature": 0, // 해당 비콘의 최저 온도
        "maxProperTemperature": 0, // 해당 비콘의 최대 온도
        "nowHumidity": 0, // 현재 해당 비콘의 습도
        "nowTemperature": 0, // 현재 해당 비콘의 온도
        "session": null, // 참여한 교육의 이름
        "battery": 0 // 현재 비콘의 배터리 잔량
    }
}
```



##### 1.4.2.2 실패시

```json
{
    "status": false
}
```





## 2. beacon

### 2.1 [POST]  /beacon/add/{beacon_id}

- 비콘 추가

#### 2.1.1 입력 형태

```js
{beacon_id}: 등록하고자 하는 비콘의 id
{
    "equipment": "string", // 비콘이 설치될 설비 이름
    "humidityMax": 0, // 비콘의 최대 습도
    "humidityMin": 0, // 비콘의 최저 습도
    "line": "string", // 비콘이 설치될 라인의 이름
    "sensing": 0, // 비콘의 신호 발신 주기
    "signalPower": 0, // 비콘의 신호 세기
    "temperatureMax": 0, // 비콘의 최대 온도
    "temperatureMin": 0 // 비콘의 최저 온도
}
```



#### 2.1.2 출력 형태

##### 2.1.2.1 성공시

```json
{
    "status": true,
    "data": {
        {beacon_id} // 등록한 비콘의 id
    }
}
```



##### 2.1.2.2 실패시

```json
{
    "status": false
}
```



### 2.2 [DELETE]  /beacon/delete/{beaconId}

- 비콘 삭제



#### 2.2.1 입력형태

```js
{beaconId}: 삭제하고자 하는 비콘의 id
```



#### 2.2.2 출력형태

##### 2.2.2.1 성공시

```json
{
    "status": true,
    "data": {
        "beacon_id": [ ... ], // 삭제하고 남은 비콘의 id값들
        "beacon_info": [
                "beacon_id": "",
                "line": "",
                "equipment": "",
                "temperatureMax": "",
                "temperatureMin": "",
                "humidityMax": "",
                "humidityMin": "",
                "sensing": "",
                "signalPower": ""
        ], // 삭제하고 남은 비콘들의 정보
        ....
        ,
        [
        ]
    }
}
```

##### 2.2.2.2 실패시

```json
{
    "status": false
}
```





### 2.3 [GET]  /beacon/list

- 비콘 전체 목록 불러오기



#### 2.3.1 입력형태

```js
none
```



#### 2.3.2 출력형태

##### 2.3.2.1 성공시

```json
{
    "status": true,
    "data": {
        "beacon_id": [ // 등록되어 있는 비콘 아이디 리스트
            "",
            ...
        ],
        "beacon_info": [ // 등록되어 있는 비콘 정보 리스트
            {
                "beacon_id": "CA:87:66:3E:6E:38",
                "line": "l101",
                "equipment": "충방전기1",
                "temperatureMax": 100,
                "temperatureMin": -1,
                "humidityMax": 100,
                "humidityMin": -1,
                "signalPower": -4,
                "sensing": 2
            },
            ...
        ]
    }
}
```

##### 2.3.2.2 실패시

```json
{
    "status": false
}
```



### 2.4 [POST] /beacon/scanInfo/{userid}

- 현재 스캔된 비콘 정보



#### 2.4.1 입력 형태

```js
{userid}: 비콘을 스캔한 유저의 id
{
    "beacon_id": "string", // 스캔된 비콘의 id
    "beacon_name": "string", // 스캔된 비콘의 이름
    "humidity": 0, // 스캔된 비콘의 현재 습도
    "temperature": 0, // 스캔된 비콘의 현재 온도
    "vbatt": 0 // 스캔된 비콘의 현재 배터리 잔량
}
```



#### 2.4.2 출력형태

##### 2.4.2.1 성공시

```json
{
    "status": true,
    "data": [// 스캔하여 발생한 알람 사항 목록
        {
            "id": "", //알람 id값
            "type": "", // 알람 type
            "line": "", // 해당 알람이 참조할 라인 이름
            "equipment": "", // 해당 알람이 참조할 설비 이름
            "beaconId": null, // 해당 알람이 발생한 비콘 id
            "writer": null, // 인수인계를 작성한 사람의 이름
            "description": null, // 인수인계 내용
            "time": "", // 알람이 생성된 시간
            "properBeaconId": "", // 원래 제출되어야 하는 체크시트의 비콘 id
            "submissionBeaconId": "", // 제출된 체크시트의 위치 비콘 id
            "minProperHumidity": 0, // 해당 비콘의 최저 습도
            "maxProperHumidity": 0, // 해당 비콘의 최대 습도
            "minProperTemperature": 0, // 해당 비콘의 최저 온도
            "maxProperTemperature": 0, // 해당 비콘의 최대 온도
            "nowHumidity": 0, // 현재 해당 비콘의 습도
            "nowTemperature": 0, // 현재 해당 비콘의 온도
            "session": null, // 참여한 교육의 이름
            "battery": 0 // 현재 비콘의 배터리 잔량
         },
        ..... 
    ]
}
```

##### 2.4.2.2 실패시

```json
{
    "status": false
}
```



### 2.5 [POST]   /beacon/update/{beacon_id}

- 비콘 정보 수정



#### 2.5.1 입력형태

```js
{beacon_id}: 수정하고자 하는 비콘의 id
{
  "equipment": "string", // 수정된 설비명
  "humidityMax": 0, // 수정된 최대 습도
  "humidityMin": 0, // 수정된 최저 습도
  "line": "string", // 수정된 라인명
  "sensing": 0, // 수정된 신호 발신 주기
  "signalPower": 0, // 수정된 신호 세기
  "temperatureMax": 0, // 수정된 최대 온도
  "temperatureMin": 0 // 수정된 최저 온도
}
```



#### 2.5.2 출력형태

##### 2.5.2.1 성공시

```json
{
    "status": true,
    "data":"beaconid" // 수정한 비콘의 아이디
}
```

##### 2.5.2.2 실패시

```json
{
    "status": false
}
```



## 3. checksheet

### 3.1 [GET]  /checksheet/

- 제출된 체크시트 목록 불러오기



### 3.1.1 입력형태

```js
none
```



#### 3.1.2 출력형태

##### 3.1.2.1 성공시

```json
{
    "status": true,
    "data":[
        {
            "machine": "", // 체크시트에 해당하는 설비명
            "checkName": "", // 체크시트 이름
            "beaconName": "" // 체크시트가 제출된 위치의 비콘 이름
        },
        ...
    ]
}
```

##### 3.1.2.2 실패시

```json
{
    "status": false
}
```



### 3.2 [POST]  /checksheet/

- 체크시트 제출하기



#### 3.2.1 입력형태

```js
{
  "beaconId": "string", // 제출한 위치의 비콘 id
  "checkName": "string", // 제출한 체크시트의 이름
  "equipment": "string", // 제출한 체크시트의 설비명
  "line": "string", // 제출한 체크시트의 라인명
  "properBeaconId": "string", // 제출한 체크시트가 원래 제출되어야 하는 위치의 비콘 id
  "userId": "string" // 제출한 유저의 id
}
```



#### 3.2.2 출력형태

##### 3.2.2.1 성공시

```json
{
    "status": true,
    "data":{
        "beaconName": ""// 제출한 위치의 비콘 id
    }
}
```

##### 3.2.2.2 실패시

```json
{
    "status": false
}
```





## 4. message

### 4.1 [POST] /message/

- 인수인계 등록



#### 4.1.1 입력형태

```js
{
  "beaconId": "string", // 인수인계를 등록할 비콘 id
  "message": "string", // 인수인계 내용
  "userId": "string" // 인수인계를 작성한 유저의 id
}
```



#### 4.1.2 출력형태

##### 4.1.2.1 성공시

```json
{
    "status": true,
    "data": {
        "message": "", // 인수인계 내용
        "beaconId": "", // 인수인계를 등록한 비콘 id
        "userId": "" // 인수인계를 등록한 유저의 id
    }
}
```

##### 4.1.2.2 실패시

```json
{
    "status": false
}
```





### 4.2 [GET] /message/beacon/{userId}

- 현재 유저와 연결된 비콘 목록 조회



#### 4.2.1 입력형태

```js
{userId}: 조회하려는 유저의 id
```



#### 4.2.2 출력형태

##### 4.2.2.1 성공시

```json
{
    "status": true,
    "data": [
        {
            "beaconName": "", // 연결된 비콘의 이름
            "beaconId": "", // 연결된 비콘의 id
            "lastSignal": "" // 가장 마지막 연결 신호 시간
        },
        ...
    ]
}
```

##### 4.2.2.2 실패시

```json
{
    "status": false
}
```



## 5. monitoring

### 5.1 [GET]  /monitoring/beacon

- 비콘 전체 목록 불러오기



#### 5.1.1 입력형태

```js
none
```



#### 5.1.2 출력형태

##### 5.1.2.1 성공시

```json
{
    "status": true,
    "data": {
        "beacons":[ // 등록되어있는 비콘들의 목록
            {
                "beaconId": "", // 비콘 id
                "beaconName": "", // 비콘 이름
                "beaconMoisture": 0, // 비콘의 현재 습도
                "beaconTemperature": 0, // 비콘의 현재 온도
                "beaconBattery": 0, // 비콘의 현재 배터리 잔량
                "tempMax": 0, // 비콘의 최대 온도
                "tempMin": 0, // 비콘의 최저 온도
                "humiMax": 0, // 비콘의 최대 습도
                "humiMin": 0, // 비콘의 최저 습도
                "equipment": "", // 비콘이 설치된 설비명
                "line": "", // 비콘이 설치된 라인명
                "connectWorkers": [], //비콘과 연결된 유저중 5분 이내에 신호가 있던 유저 목록
                "nonConnectWorkers": [], // 비콘과 연결된 유저중 5분이상 신호가 없는 유저
                "xpos": 0, // 비콘의 x좌표
                "ypos": 0 // 비콘의 y좌표
            },
            ...
        ],
        "totalLoginWorker": [ // 현재 근무중인 유저 아이디 목록
            "",
            ...
        ],
        "onSignalWorker": [ // 5분이내에 신호가 있던 유저 아이디 목록
            "",
            ...
        ],
        "nonSignalWorker": [ // 5분이상 신호가 끊긴 유저 아이디 목록
            "",
            ...
        ]
    }
}
```

##### 5.1.2.2 실패시

```json
{
    "status": false
}
```





## 6. user

### 6.1 [POST]  /user/login

- 로그인

#### 6.1.1 입력형태

```js
form-data
userid: // 로그인 하려는 유저의 id
password: // 로그인 하려는 유저의 pw
```



#### 6.1.2 출력형태

##### 6.1.2.1 성공시

```json
{
    "status": true,
    "data": {
        "admin": boolean, // 로그인한 유저의 관리자 여부
        "userId": "" // 로그인한 유저의 id
    }
}
```

##### 6.1.2.2 실패시

```json
{
    "status": false
}
```



### 6.2 [POST]  /user/logout/{userId}

- 로그아웃



#### 6.2.1 입력형태

```js
{userId}: 로그아웃 하려는 유저의 id
```



#### 6.2.2 출력형태

##### 6.2.2.1 성공시

```json
{
    "status": true,
}
```

##### 6.2.2.2 실패시

```json
{
    "status": false
}
```



## 참고 사항
### BuildThing Beacon
```url
https://github.com/buildit-lab
```



## 고객 문의
Github Issue 외 기타 문의 사항은 parkbum150@gmail.com로 문의해주시기 바랍니다.