cd .env/keys
ssh-keygen -t rsa -b 2048 -m PEM -f rsa.pem.key
openssl rsa -in rsa.pem.key -pubout -outform PEM -out rsa.pem.cer
