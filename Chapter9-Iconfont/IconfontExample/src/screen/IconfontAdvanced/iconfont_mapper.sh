#!/bin/sh

if [ $# != 1 ] ; then

    echo "usage: $0 iconfont.svg(your svg file name)  "
    exit
fi

#OutputFile path,you can customize your path
OutputFileName=`echo iconfont.json`

mapper=` awk '{ if($0 ~ /glyph-name/) print $0;  if($0 ~ /unicode/)  print $0"|split|" }'  $1| tr '[:upper:]' '[:lower:]'| awk '{print $0}'  RS='\='| tr "\n\"&#;" " "| awk  '{ if ($1!="split"&&$1!=""){ printf ("\""$3"\":"); printf ($5","); print "\r " }}' RS="|split|" | sed "s/-/_/g"`

rm $OutputFileName
echo "{" >> $OutputFileName
echo $mapper >> $OutputFileName
echo "}" >> $OutputFileName

#usage:
# ./iconfont_mapper.sh svg_file_path