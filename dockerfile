FROM nginx:alpine

# static 파일 복사
COPY app/dist /usr/share/nginx/html

# 포트 오픈
EXPOSE 80

# 실행 명령어
ENTRYPOINT ["nginx", "-g", "daemon off;"]
