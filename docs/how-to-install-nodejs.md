# 安装 nodejs

### centos

```
yum update
```

### ubuntu

```
apt update
```

### 下载

wget https://nodejs.org/dist/v12.16.3/node-v12.16.3-linux-x64.tar.xz

### 解压

tar -C /usr/local -xzf node-v12.16.3-linux-x64.tar.xz

### 设置环境变量

export PATH=\$PATH:/usr/local/node-v12.16.3-linux-x64/bin

### 验证成功

node -v
npm -v
