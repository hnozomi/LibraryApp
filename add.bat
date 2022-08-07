echo off



:select

	echo ----------------------------------------------------------
	echo CommitとPushどちらを実行しますか(C=Commit / P=Push)
	echo ----------------------------------------------------------

	set selected=
	set /p selected=

	if "%selected%"=="" (
	goto spaceselectcheck
	)

	if /i %selected%==c (goto :commitstart)
	if /i %selected%==commit (goto commitstart)

	if /i %selected%==p (goto pushstart)
	if /i %selected%==push (goto pushstart)

	goto inputselectcheck


:commitstart

	echo ----------------------------------------------------------
	echo prefixを入力してください
	echo ----------------------------------------------------------

	set PREFIX=
	set /p PREFIX=

	echo ----------------------------------------------------------
	echo commitメッセージを入力してください
	echo ----------------------------------------------------------

	set MESSAGE=
	set /p MESSAGE=


	set TRUE_FALSE=FALSE
	IF %PREFIX%==build set TRUE_FALSE=TRUE
	IF %PREFIX%==chore set TRUE_FALSE=TRUE
	IF %PREFIX%==ci set TRUE_FALSE=TRUE
	IF %PREFIX%==docs set TRUE_FALSE=TRUE
	IF %PREFIX%==feat set TRUE_FALSE=TRUE
	IF %PREFIX%==fix set TRUE_FALSE=TRUE
	IF %PREFIX%==perf set TRUE_FALSE=TRUE
	IF %PREFIX%==refactor set TRUE_FALSE=TRUE
	IF %PREFIX%==revert set TRUE_FALSE=TRUE
	IF %PREFIX%==style set TRUE_FALSE=TRUE
	IF %PREFIX%==test set TRUE_FALSE=TRUE

	set COMMIT_MESSAGE=
	set COMMIT_MESSAGE=%PREFIX%: %MESSAGE%

	IF %TRUE_FALSE%==TRUE (
	    echo commit start
	    git commit -m "%COMMIT_MESSAGE%"
	    
	    if errorlevel 1 (
	     echo [ERROR]: commit failed
	     goto exitlabel
	    ) else (
	     echo [INFORMATION]: commit success
	     goto pushcheck
	    )
	    

	) ELSE (
	    echo [ERROR]: No matching PREFIX
	    echo Please select build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
	    goto exitlabel
	)


:pushstart
	for /f "usebackq tokens=2" %%t in (`git branch --contains`) do set CURRENT_BRANCH=%%t

	if %CURRENT_BRANCH%==main1 (
	    echo [ERROR]: Don't push to main and develop
	    goto exitlabel
	) else (
	    echo push start
	    git push origin main
	    
	    if errorlevel 1 (
	     echo [ERROR]: push failed
	     goto exitlabel
	    ) else (
	     echo [INFORMATION]: push success
	     goto exitlabel
	    )
	)

:pushcheck
	echo -------------------------------------
	echo 続けてPushしますか(Y=YES / N=NO)
	echo -------------------------------------

	set push=
	set /p push=
	
	if "%push%"=="" (goto spacepushcheck)

	if /i %push%==y (goto pushstart)

	if /i %push%==yes (goto pushstart)

	if /i %push%==n (goto no)

	if /i %push%==no (goto no)

	goto :inputpushcheck


:inputpushcheck
	echo yかnを入力してください
	goto pushcheck

:spacepushcheck
	echo 空白のままです
	goto pushcheck


:inputselectcheck
	echo cかpを入力してください
	goto select

:spaceselectcheck
	echo 空白のままです
	goto select

:no
	echo 処理を終了します
	goto exitlabel


:exitlabel
	exit /b