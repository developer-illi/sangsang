from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.http import HttpResponse
from django.http import JsonResponse

from main.models import Sol_content, Solutions, Admin, Apply, Apply_content


# Create your views here.

@csrf_exempt
def main_page(request):
    arg = {}
    return render(request, 'main.html', arg)

@csrf_exempt
def header_test(request):
    arg = {}
    return render(request, 'header.html', arg)

@csrf_exempt
def footer_test(request):
    arg = {}
    return render(request, 'footer.html', arg)

@csrf_exempt
def intro(request):
    arg = {}
    return render(request, 'intoduce/intomsg.html', arg)

@csrf_exempt
def sol_intro(request):
    solutions = Solutions.objects.all()
    arg = {'sol':solutions}
    return render(request, 'solution/solintro.html', arg)

@csrf_exempt
def sol_page(request, id):
    try:
        sol_intro = Solutions.objects.get(pk=id)
        sol_content = Sol_content.objects.filter(solutions=sol_intro)
        arg = {'soldata' : sol_content, 'sol_intro':sol_intro}
    except Sol_content.DoesNotExist:
        arg = {'error':"올바른 페이지가 아닙니다."}
    return render(request, 'solution/dron.html',arg)


@csrf_exempt
def app_page(request, id):
    try:
        app_intro = Apply.objects.get(pk=id)
        app_content = Apply_content.objects.filter(apply=app_intro)
        arg = {'soldata' : app_content, 'sol_intro':app_intro}
    except Apply_content.DoesNotExist:
        arg = {'error':"올바른 페이지가 아닙니다."}
    return render(request, 'solution/dron.html',arg)

@csrf_exempt
def app_intro(request):
    app = Apply.objects.all()
    arg = {'app':app}
    return render(request, 'applicaion/appintro.html', arg)

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
def dron(request):
    arg = {}
    return render(request, 'solution/dron.html', arg)
@csrf_exempt
def bild(request):
    arg = {}
    return render(request, 'solution/construction.html', arg)

@csrf_exempt
def threedmodel(request):
    arg = {}
    return render(request, 'solution/3dmodel.html', arg)
@csrf_exempt
def confessor(request):
    arg = {}
    return render(request, 'solution/confessor.html', arg)


@csrf_exempt
def bride(request):
    arg = {}
    return render(request, 'applicaion/bridge.html', arg)

@csrf_exempt
def social(request):
    arg = {}
    return render(request, 'applicaion/social.html', arg)

@csrf_exempt
def erection(request):
    arg = {}
    return render(request, 'applicaion/erection.html', arg)

@csrf_exempt
def dron_sol(request):
    arg = {}
    return render(request, 'applicaion/dronsol.html', arg)

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
    return render(request,'admin_login.html', arg)


@csrf_exempt
def admin_login(request):
    if request.method == 'POST':
        try:
            username = request.POST['u_id']
            password = request.POST['password']
            user = Admin.objects.get(user=username, password=password)
            arg = {'user':user}
        except Admin.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': '아이디또는 비밀번호를 확인해주세요.'})
    return render(request,'admin_login.html', arg)

@csrf_exempt
def test(request):
    arg = {}
    return render(request, 'sol_item_viewer.html', arg)
@csrf_exempt
def admin(request):
    solutions = Solutions.objects.all()
    apply = Apply.objects.all()
    arg = {'solutions': solutions, 'apply':apply}
    return render(request, 'admin.html', arg)

@csrf_exempt
def tapp_adds(request):
    if request.method == 'POST' and request.FILES.get('image'):
        target = request.POST['qnsfb']
        title = request.POST['title']
        title_ex = request.POST['title_ex']
        copy = request.POST['copy']
        copy_ex = request.POST['copy_ex']
        img = request.FILES['image']

        if target == '1':
            sol_create = Solutions.objects.create(title=title, title_ex=title_ex, main_cp=copy, main_text=copy_ex,content_img=img)
            sol_create.save()
        else:
            apply = Apply.objects.create(title=title, title_ex=title_ex, main_cp=copy, main_text=copy_ex,content_img=img)
            apply.save()
        return redirect('admin_pg')
    return HttpResponse('false')
@csrf_exempt
def sol_item_add(request):
    if request.method == 'POST' and request.FILES.get('sol_image'):
        title = request.POST['sol_title']
        content_text = request.POST['sol_content']
        content_img = request.FILES['sol_image']
        type = int(request.POST['sol_type'])
        selected_category = request.POST['sol_item_category']
        sol = Solutions.objects.get(pk=selected_category)
        sol_item = Sol_content.objects.create(title=title, content_text=content_text, content_img=content_img, type=type,solutions=sol)
        sol_item.save()

        return redirect('admin_pg')
    return HttpResponse('false')

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