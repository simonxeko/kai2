newFolder=""

while IFS= read line
do
    echo "$line"
    if [ "${line:0:3}" == "cd " ]
    then
        newFolder=${line:3}
    fi
done < <(kai2js $@)

if [ "$newFolder" == "" ]
then
    echo ""
else
    cd "$newFolder"
fi