function Forums(common, store, view) {

    this.common = common;
    this.store = store;
    this.view = view;

    // Init Article Number
    (function () {
        var num = store.get("number");
        if ( !num ) {
            store.save("number", 0);
        }
    })();

    this.pages = this.loadSubjects();

    this.common.hide(".writeSubject");
    this.initEvents();
}

Forums.prototype.initEvents = function() {

    const done = this.common.select("#done");
    const that = this;

    if ( done ) {
        done.onclick = () => {
            let subject = this.common.select("#subject").value;
            let content = this.common.select("#content").value;

            const loginMember = this.common.getLoginMember();

            if (!loginMember || !subject || !content) {
                alert("다음 사유 중 하나 이상의 이유로 등록되지 못했습니다.\n1. 로그인이 필요함\n2. 필수 입력값이 누락됨.");
                return false;
            }

            content = this.common.replaceNewLineToBr(content);
            const article = {
                number: this.store.newNumber(),
                subject: subject,
                writer: loginMember.name,
                writerId: loginMember.id,
                content: content,
                read: 0
            };

            this.store.save(article.number, JSON.stringify(article));

            this.view.addNewArticle(article, this.pages.init, function clear() {
                this.common.select("#subject").value = "";
                this.common.select("#content").value = "";
            });

            this.common.initTextareaHeight();
            this.common.slideUp(".writeSubject");
        };
    }

    const write = this.common.select("#write");
    if ( write ) {
        write.onclick = function () {
            that.common.slideDown(".writeSubject");
        };
    }

    const more = this.common.select("#more");
    if ( more ) {
        more.onclick = function () {
            that.pages.next();
        }
    }

    const search = this.common.select("#search");
    if( search ) {
      search.onkeyup = function() {
        that.pages.next( search.value );
      };
    }
};

Forums.prototype.loadSubjects = function() {
    let lastNumber = this.store.get("number");
    const that = this;
    var subjects =  {
        next: function(searchKeyword) {
          // 검색창에 dafault값이 있으면 (아무것도 안써있으면) lastNumber가 0이므로
          // while 문에서 break 걸려버림
          if ( searchKeyword ) {
            lastNumber = that.store.get("number");
          }

            var articles = (function loadSomeSubjects() { //호이스팅 하기때문에 const로 바꾸지 않음
                articles = [];
                while ( articles.length < 10 ) {
                    if ( lastNumber == 0 ) {
                        break;
                    }

                    const data = that.store.getAndConvertJSON(lastNumber--);
                    console.log(data);

                    if ( data ) {
                      if ( searchKeyword ) {
                      if ( data.subject.includes(searchKeyword) ) {
                        articles.push(data);
                      }
                    }
                    else {
                      articles.push(data);
                    }
                        // articles.push(data);
                    }
                }

                return articles;
            })();

            articles.forEach(function(data) {

                that.view.addReverseNewArticle(data, null, null, function(newRow) {
                    newRow.onclick = function() {

                        const tbody = this.parentElement;
                        if ( tbody.rows[this.rowIndex] && tbody.rows[this.rowIndex].className == "detail" ) {
                            that.view.removeDetailRows(tbody);
                            return false;
                        }

                        that.view.removeDetailRows(tbody);

                        let number = this.cells[0].innerText;
                        const oneData = that.store.getAndConvertJSON(number);
                        oneData.read++;
                        this.cells[3].innerText = oneData.read;

                        that.view.addDetailView(tbody, this.rowIndex, oneData.content);

                        that.store.save(oneData.number, JSON.stringify(oneData));
                    };
                });

            });
        },
        init: function() {
            var tableBody = that.common.select("table > tbody");
            if ( tableBody ) {
                tableBody.innerHTML = "";
                lastNumber = that.store.get("number");
                (that.pages || this).next();
            }
        }
    };

    subjects.init();
    return subjects;
}

window.app = window.app || {};
window.app.Forums = Forums;
