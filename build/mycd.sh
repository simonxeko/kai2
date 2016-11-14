newFolder="t"

while IFS= read line
do
    echo "$line"
    if [ "${line:0:3}" == "cd " ]
    then
        newFolder=${line:3}
    fi
done < <(kai-real $@)

if [ ! "$newFolder" == "" ]
then
    cd "$newFolder"
fi