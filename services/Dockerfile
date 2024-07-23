# Usar una imagen base de Python
FROM python:3.9

# Establecer el directorio de trabajo
WORKDIR /services

# Copiar los archivos requeridos
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

# Exponer el puerto
EXPOSE 5000

# Establecer variables de entorno
ENV MONGODB_URI="mongodb+srv://martinvaldez735:lisandro1@cluster0.ixbjj4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]
