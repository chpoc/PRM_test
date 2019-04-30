pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('pre-checks') {
      parallel {
        stage('pre-checks') {
          steps {
            sh '''
killnode=`netstat -tulpn | grep 8089 | cut -d \'/\' -f1 | awk \'{print $7}\'`
#kill -9 $killnode

if [ -z "$killnode" ]
then
      echo "no existing deployments"
else
      echo "killing old deployments"
      kill -9 $killnode
fi'''
          }
        }
        stage('build') {
          steps {
            sh '''source ./env.sh
unzip oracle.zip
#cp -r dist ./PRM_UI
cd PRM_Node
npm install -g @angular/cli
npm install oracledb --unsafe-perm=true --allow-root
#yum install libaio -y
npm start --prefix $WORKSPACE/PRM_Node &
cd $WORKSPACE/PRM_UI

npm install --prefix $WORKSPACE/PRM_UI --unsafe-perm=true --allow-root 
ng build --base-href "/PRM/"'''
          }
        }
        stage('sonar') {
          steps {
            sh '''
cd $WORKSPACE/PRM_Node
sonar-scanner -Dsonar.host.url=http://192.168.28.162:9000
'''
          }
        }
        stage('mocha') {
          steps {
            sh '''echo $WORKSPACE
cp $WORKSPACE/PRM_Node/routes/partnerdata/partnerExternalSearch.js /usr/lib/node_modules/npm/lib/
cp $WORKSPACE/PRM_Node/test/partnerExternalServicetest.js /usr/lib/node_modules/npm/test
cd /usr/lib/node_modules/npm/test
mocha partnerExternalServicetest.js

cp $WORKSPACE/PRM_Node/routes/partnerdata/partnerGetInfo.js /usr/lib/node_modules/npm/lib/
cp $WORKSPACE/PRM_Node/test/partnerExternalServicetestFail.js /usr/lib/node_modules/npm/test
cd /usr/lib/node_modules/npm/test
mocha partnerExternalServicetestFail.js'''
          }
        }
        stage('') {
          steps {
            git(url: 'https://github.com/chpoc/prm-demo.git', branch: 'R1.1_add_journal_entry', credentialsId: 'git_chcpoc')
          }
        }
      }
    }
    stage('jira issue') {
      steps {
        jiraAddComment(idOrKey: 'RMCH-230', comment: 'SUCCESS $BUILD_URL', auditLog: true, failOnError: true, site: 'LOCAL', input: 'open')
      }
    }
  }
}