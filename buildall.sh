#!/bin/sh
APNSCP_HOME=/usr/local/apnscp
THEME_PATH=${APNSCP_HOME}/public/css/themes

for file in $THEME_PATH/*.css ; do 
	if [[ "${file#*.}" == "min.css" ]] ; then
		continue
	fi	
	THEME=${file%%.*}
	THEME=${THEME##*/}
	env THEME=$THEME grunt dist
	if [[ $? -ne 0 ]] ; then
		echo "FAILED: $THEME"
		exit 1;
	else
		echo "BUILT: $THEME"
	fi
done
exit 0

