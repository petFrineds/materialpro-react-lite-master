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

4. node 버전 업그레이드 (4개중 하나 입력하시면 되요, 저는 보통 안정버전 받아요!)

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

그리고 **node_modules 폴더 삭제 후 다시 npm install** 해주시면 될 거예요!!


=============================================================
배포방법
=============================================================
사전 확인 사항
node -v
npm -v
Node와 Npm이 설치되어 있어야 한다.
설치 시 참고  : CentOS7  Node.js 설치

2. ACCOUT_ID와 AWS_REGION이 등록되어 있는지 확인
   echo $ACCOUNT_ID
   1) 등록 안되어 있을 때 등록

export ACCOUNT_ID=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.accountId')

echo "export ACCOUNT_ID=${ACCOUNT_ID}" | tee -a ~/.bash_profile

       export AWS_REGION=$(curl -s 169.254.169.254/latest/dynamic/instance-identity/document | jq -r '.region')

aws configure set default.region ${AWS_REGION}

3. 지금부터는 Root 계정 사용


4. frontend main 폴더 안으로 이동
   cd /home/ec2-user/frontend/materialpro-react-lite-master/main


5. npm install

6. npm audit fix (취약점 나왔을 떄 )

7. npm run build

8. cd .. (DockerFile 있는 경로로 이동)

9. 도커 빌드
   docker build -t frontend .

10. 도커 이미지 태그 달기
    docker tag frontend:latest 811288377093.dkr.ecr.$AWS_REGION.amazonaws.com/frontend:latest

11. 도커 푸쉬
    docker push 811288377093.dkr.ecr.$AWS_REGION.amazonaws.com/frontend:latest

12. 도커 로그인 확인
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin 811288377093.dkr.ecr.us-west-2.amazonaws.com/

13. 여기서부터는 ec2로 로그인

su - ec2-user


14. frontend/manifest 경로로 이동


15. frontend deployment 배포
    kubectl apply -f frontend-deploy.yaml (ec2-user로 실행해야함, root는 노노 )

kubectl get deployment 확인 frontend deployment ready 1/1 인지 확인



16. frontend service 배포

kubectl apply -f frontend-service.yaml (ec2-user로 실행해야함, root는 노노 )



17. 전체 ingress 파일 경로로 이동
    cd /home/ec2-user/backend/Payment/manifests

18. ingress 배포
    kubecl apply -f all-ingress.yaml
    kubectl get ingress (ingress 확인)



19. ingress URL 확인
    echo http://$(kubectl get ingress/backend-ingress -o jsonpath='{.status.loadBalancer.ingress[*].hostname}')
