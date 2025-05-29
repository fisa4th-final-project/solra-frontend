FROM nginx:alpine

# static 파일 복사
COPY app/dist /usr/share/nginx/html

# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 오픈
EXPOSE 80

# 실행 명령어
ENTRYPOINT ["nginx", "-g", "daemon off;"]
