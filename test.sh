        IFS='B'
        str="Learn-Bash-B-From-EduCBA"
        echo "The string we are going to split by hyphen '-' is: $str"
        read -rasplitIFS<<< "$str"
        echo "Print out the different words separated by hyphen '-'"
        for word in "${splitIFS[@]}"; do
          echo $word
        done
        echo "Setting IFS back to whitespace"
        IFS=''