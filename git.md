####git 

git命令博客地址[https://blog.csdn.net/l2show/article/details/40742803]


1. 初始化本地仓库;  git init 
   > 成功的标识 Initialized empty Git repository in /Users/maty/Documents/mty/.git/
   git add -A
2.  git status 在git init 之后查看状态, 绿色的标识新增, 红色的标识已经更改;
3.  git commit -m "注释" 把暂存区里的内容提交到本地仓库;
4.  git reflog  查看版本日志;
5.  git reset --hard 版本还原;
6.  git --help 指令提示;
7.  rm rf 删除仓库

***

####提交到远程仓库

1. git remote add origin https://github.com/maty1991/1820A.git
   
       添加远程的  "源（可以自定义的名字）" 名字的内容 

   git remote add o https://github.com/maty1991/1820A.git

   git remote -v                     //查看当前远程仓库的名字和地址的信息列表。
   git remote show wepu             //查看远程仓库wepu的信息
   git remote add test url           //添加名为test的远程仓库。
   git remote rename pd paul        //将远程仓库pd名字改为paul
   git remote rm paul                //移除远程仓库paul



####分支

1. git branch      创建分支
   git branch -d   删除分支
   git branch -D   强制删除分支

2. git checkout     切换分支;
   git checkout -b  创建并切换分支;

3. git merge        分支合并;
