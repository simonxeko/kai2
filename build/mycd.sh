newFolder=""

kai2js $@

newFolder=$(cat $HOME/.kai/cd 2>/dev/null)
rm "$HOME/.kai/cd" 2>/dev/null

if [ "$newFolder" == "" ]
then
    n=1
else
    cd "$newFolder"
fi