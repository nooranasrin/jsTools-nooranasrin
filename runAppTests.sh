# version 1.41
runTest() {
  local test=$1
  local command=`head -1 $test | tr -d '\r'`
  #echo $command
  sed "1d" $test | tr -d '\r'> expected.txt
  truncate -s -1 expected.txt
  #cat expected_output.txt
  eval $command &> output.txt
  cmp output.txt expected.txt > /dev/null
  if [ $? -eq 0 ]
  then
    result="✅"
  else
    result="❌"
    echo "---------$test----------" >> failures.txt
    echo "\t\t\t<= command =>\n$command" >> failures.txt
    echo "\n\t\t\t<= actual output =>" >> failures.txt
    cat output.txt >> failures.txt
    echo "\n\t\t\t<= expected output =>" >> failures.txt
    cat expected.txt >> failures.txt
  fi
  rm -f output.txt expected.txt
  echo "$result $test"
}
echo "running $# tests"
echo "----- starting  ---------"
rm -f failures.txt
for test in $*
do
  runTest $test
done
echo "----- ending  ---------"
if test -f failures.txt
then
  echo "please look at failures.txt for details"
fi