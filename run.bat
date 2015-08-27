@set GIT_PATH=D:\Git\bin\
@echo %PATH% | find "git.exe"
@if %errorlevel% == 1 set PATH=%PATH%;%GIT_PATH%
@rem @echo %cd%
@git clone https://github.com/AngusFu/gulpPack
