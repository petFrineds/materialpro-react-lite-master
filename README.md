# materialpro-react-lite-master


React UI Template

1. 실행 방법
package.json 우클릭 > Open in Integerated Terminal


npm install 

npm run start

2. localhost 포트에서 확인 가능



#### **npm install 에러 시 해결 방법**

(버전 문제일 가능성 다분해서 npm과 node 버전 재 설치 해주시면 됩니다!)

1. 현재 캐쉬 삭제

   ```
   npm cache clean -f 
   ```

2. npm 버전 업그레이드

   ```
   npm install -g npm@latest   (latest 대신 버전 정보 적어도 됩니다!)
   ```

3. node js 관리하는 n 모듈 설치

   ```
   npm install -g n
   ```

4. node 버전 업그레이드

   ```
   n stable (안정버전) 
   n lts
   n latest (최신버전)
   n x.x.x  (특정버전)
   ```

   해당 명령어 실행 시 sudo 권한이 필요하다는 에러

   ```
   mkdir: cannot create directory ‘/usr/local/n’: Permission denied
   
     Error: sudo required (or change ownership, or define N_PREFIX)
   ```

   가 뜬다면 

   ```
   export N_PREFIX=$HOME/.n
   export PATH=$N_PREFIX/bin:$PATH
   ```

   이 두 줄 입력 후 다시 실행하시면 됩니다!


