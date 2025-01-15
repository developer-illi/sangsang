from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponse
from django.http import JsonResponse

from main.models import Sol_content, Solutions, Admin, Apply, Apply_content, Main_pg, History, Solution, Project, \
    Project_title


# Create your views here.

@csrf_exempt
def main_page(request):
    arg = {}
    return render(request, 'index.html', arg)

@csrf_exempt
def about_pg(request):
    about = Main_pg.objects.get()
    history = History.objects.all()
    arg = {'history':history,'about':about}
    return render(request, 'sub/about.html', arg)

@csrf_exempt
def contact_pg(request):
    main_page = Main_pg.objects.get()
    history = History.objects.all()
    arg = {'history':history,'main_page':main_page}
    return render(request, 'sub/contact.html', arg)

@csrf_exempt
def project_pg(request):
    project = Project.objects.get(pk=1)
    arg = {'project':project}
    return render(request, 'sub/project.html', arg)

@csrf_exempt
def solution_pg(request):
    solution = Solution.objects.get(pk=1)
    arg = {'solution':solution}
    return render(request, 'sub/solution.html', arg)

@csrf_exempt
def get_val_items(request):
    sol_id = request.GET.get('sol_item_category')
    if sol_id:
        val_items = Sol_content.objects.filter(solutions=sol_id)  # ForeignKey 필드 사용
        items_list = [{'pk': item.pk, 'title': item.title, 'sol_main':sol_id} for item in val_items]
        return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})

@csrf_exempt
def get_app_items(request):
    app_id = request.GET.get('app_item_category')
    if app_id:
        val_items = Apply_content.objects.filter(apply=app_id)  # ForeignKey 필드 사용
        items_list = [{'pk': item.pk, 'title': item.title, 'app_main':app_id} for item in val_items]
        return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})

@csrf_exempt
def get_tap_items(request):
    tap_id = request.GET.get('tap_item')
    if tap_id:
        if tap_id == "1":
            val_items = Solutions.objects.all()
            items_list = [{'pk': str(item.pk)+'sol', 'title': item.title, 'app_main':tap_id} for item in val_items]
            return JsonResponse({'val_items': items_list})
        else:
            val_items = Apply.objects.all()
            items_list = [{'pk': str(item.pk)+'app', 'title': item.title, 'app_main': tap_id} for item in val_items]
            return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})


def inquiry(request):
    arg = {}
    return render(request, 'inquiry.html', arg)



# Create your models here.

def send_email(request):
    if request.method == 'POST':
        subject = request.POST['subject']
        message = request.POST['message']
        sender_email = 'your-email@example.com'  # 발신자 이메일
        recipient_list = ['recipient@example.com']  # 수신자 이메일 목록

        send_mail(subject, message, sender_email, recipient_list)
        return HttpResponse("이메일이 성공적으로 전송되었습니다!")
    return render(request, 'inquiry.html')


@csrf_exempt
def admin_pg(request):
    arg = {}
    return render(request,'admin/login.html', arg)

@csrf_exempt
def login(request):
    arg = {

    }
    return render(request, 'admin/about.html', arg)
@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        try:
            username = request.POST['u_id']
            raw_password = request.POST['password']

            # 사용자 가져오기
            user = Admin.objects.get(user=username)
            # 비밀번호 검증
            if user.check_password(raw_password):
                arg = {'user': user}
                return render(request, 'admin_login.html', arg)
            else:
                return JsonResponse({'status': 'error', 'message': '아이디 또는 비밀번호를 확인해주세요.'})

        except Admin.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': '아이디 또는 비밀번호를 확인해주세요.'})

    return render(request, 'admin_login.html')


@csrf_exempt
def admin(request):
    solutions = Solutions.objects.all()
    apply = Apply.objects.all()
    arg = {'solutions': solutions, 'apply':apply}
    return render(request, 'admin.html', arg)

@csrf_protect  # csrf 보호 적용
def sol_item_add(request):
    if request.method == 'POST' and request.FILES.get('sol_image'):
        try:
            title = request.POST['sol_title']
            content_text = request.POST['sol_content']
            content_img = request.FILES['sol_image']
            sol_type = int(request.POST['sol_type'])
            selected_category = request.POST['sol_item_category']

            # Solutions 객체 가져오기
            sol = get_object_or_404(Solutions, pk=selected_category)

            # Sol_content 생성
            sol_item = Sol_content.objects.create(
                title=title,
                content_text=content_text,
                content_img=content_img,
                type=sol_type,
                solutions=sol
            )
            sol_item.save()

            return JsonResponse({'success': True, 'message': '등록되었습니다.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': '잘못된 요청입니다.'})

@csrf_exempt
def delete_sol_item(request, item_id):
    if request.method == 'DELETE':
        try:
            item = Sol_content.objects.get(pk=item_id)
            item.delete()
            return JsonResponse({'success': True})
        except Sol_content.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def app_item_add(request):
    if request.method == 'POST' and request.FILES.get('app_image'):
        title = request.POST['app_title']
        content_text = request.POST['app_content']
        content_img = request.FILES['app_image']
        type = int(request.POST['app_type'])
        selected_category = request.POST['app_item_category']
        app = Apply.objects.get(pk=selected_category)
        app_item = Apply_content.objects.create(title=title, content_text=content_text, content_img=content_img, type=type, apply=app)
        app_item.save()

        return redirect('admin_pg')
    return HttpResponse('false')

@csrf_exempt
def delete_app_item(request, item_id):
    if request.method == 'DELETE':
        try:
            item = Apply_content.objects.get(pk=item_id)
            item.delete()
            return JsonResponse({'success': True})
        except Apply_content.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def delete_tap_item(request, item_id):
    if request.method == 'DELETE':
        separator = item_id[-3:]
        if separator == 'sol':
            try:
                id = int(item_id[:-3])
                del_item = Solutions.objects.get(pk=id)
                del_item.delete()
                return JsonResponse({'success': True})
            except Solutions.DoesNotExist:
                return JsonResponse({'error': 'Item not found'}, status=404)
        else:
            try:
                id = int(item_id[:-3])
                del_item = Apply.objects.get(pk=id)
                del_item.delete()
                return JsonResponse({'success': True})
            except Apply.DoesNotExist:
                return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)