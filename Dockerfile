# =====================================================
# PROMEIA · 普罗米娅 粉丝向展示页
# 静态站点 Docker 镜像 · 基于 nginx:alpine
# =====================================================

FROM nginx:1.27-alpine

LABEL maintainer="Promeia Tribute Page"
LABEL description="Zenless Zone Zero · Promeia fan-made static tribute page"

# 清空 nginx 默认站点
RUN rm -rf /usr/share/nginx/html/*

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制静态资源
COPY index.html /usr/share/nginx/html/
COPY style.css  /usr/share/nginx/html/
COPY script.js  /usr/share/nginx/html/
COPY images/    /usr/share/nginx/html/images/

# 容器内对外端口
EXPOSE 80

# nginx 健康检查（可选）
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
